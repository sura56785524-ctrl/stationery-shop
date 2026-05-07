const express = require("express");
const { getMyCart, saveMyCart, clearMyCart } = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getMyCart);
router.put("/", protect, saveMyCart);
router.delete("/", protect, clearMyCart);

module.exports = router;
