const express = require("express");
const { createOrder, getOrders, updateOrderStatus } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getOrders);
router.post("/", protect, createOrder);
router.patch("/:id/status", protect, updateOrderStatus);

module.exports = router;
