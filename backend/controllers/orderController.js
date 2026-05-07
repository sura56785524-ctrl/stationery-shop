const Order = require("../models/Order");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

function randomOrderId() {
  return `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

async function createOrder(req, res) {
  try {
    const payload = req.body;
    const order = await Order.create({
      ...payload,
      orderId: randomOrderId(),
      userId: req.user._id,
      userEmail: req.user.email,
      userName: payload.userName || req.user.name,
    });

    for (const item of payload.items || []) {
      await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -Math.abs(item.quantity || 0) } });
    }

    await Cart.findOneAndUpdate({ userId: req.user._id }, { items: [] }, { upsert: true });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: "Failed to create order." });
  }
}

async function getOrders(req, res) {
  const filter = req.user.role === "admin" ? {} : { userId: req.user._id };
  const orders = await Order.find(filter).sort({ createdAt: -1 });
  res.json(orders);
}

async function updateOrderStatus(req, res) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required." });
  }
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status || "pending" },
    { new: true, runValidators: true }
  );
  if (!order) return res.status(404).json({ message: "Order not found." });
  res.json(order);
}

module.exports = { createOrder, getOrders, updateOrderStatus };
