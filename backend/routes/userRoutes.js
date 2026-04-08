const express = require("express");
const { getUsers, updateUser, updateAccountSettings } = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, adminOnly, getUsers);
router.put("/:id", protect, updateUser);
router.patch("/:id/account", protect, updateAccountSettings);

module.exports = router;
