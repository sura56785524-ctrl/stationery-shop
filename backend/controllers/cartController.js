const Cart = require("../models/Cart");

async function getMyCart(req, res) {
  const cart = await Cart.findOne({ userId: req.user._id });
  res.json({ items: cart?.items || [] });
}

async function saveMyCart(req, res) {
  const items = req.body.items || [];
  const cart = await Cart.findOneAndUpdate(
    { userId: req.user._id },
    { items },
    { new: true, upsert: true }
  );
  res.json({ items: cart.items || [] });
}

async function clearMyCart(req, res) {
  const cart = await Cart.findOneAndUpdate(
    { userId: req.user._id },
    { items: [] },
    { new: true, upsert: true }
  );
  res.json({ items: cart.items || [] });
}

module.exports = { getMyCart, saveMyCart, clearMyCart };
