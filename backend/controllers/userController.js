const bcrypt = require("bcryptjs");
const User = require("../models/User");

function toPublicUser(user) {
  return {
    id: user._id.toString(),
    uid: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    role: user.role,
    avatar: user.avatar,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

async function getUsers(req, res) {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users.map(toPublicUser));
}

async function updateUser(req, res) {
  const { id } = req.params;
  const updates = { ...req.body };

  if (req.user.role !== "admin" && req.user._id.toString() !== id) {
    return res.status(403).json({ message: "You can only update your own profile." });
  }

  delete updates.passwordHash;
  delete updates.password;
  delete updates.email;

  // Role changes are not allowed from this endpoint.
  // Use the dedicated script to set a single admin owner.
  delete updates.role;

  const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  if (!user) return res.status(404).json({ message: "User not found." });
  res.json(toPublicUser(user));
}

async function updateAccountSettings(req, res) {
  const { id } = req.params;
  const {
    email,
    avatar,
    currentPassword,
    newPassword,
  } = req.body || {};

  if (req.user._id.toString() !== id && req.user.role !== "admin") {
    return res.status(403).json({ message: "You can only update your own account settings." });
  }

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found." });

  if (typeof email === "string") {
    const normalizedEmail = email.toLowerCase().trim();
    if (!normalizedEmail) {
      return res.status(400).json({ message: "Email cannot be empty." });
    }
    const existing = await User.findOne({ email: normalizedEmail, _id: { $ne: user._id } });
    if (existing) {
      return res.status(409).json({ message: "Email already in use." });
    }
    user.email = normalizedEmail;
  }

  if (typeof avatar === "string") {
    user.avatar = avatar.trim();
  }

  if (newPassword) {
    if (!currentPassword) {
      return res.status(400).json({ message: "Current password is required to set a new password." });
    }
    const valid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }
    if (String(newPassword).length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters." });
    }
    user.passwordHash = await bcrypt.hash(String(newPassword), 12);
  }

  await user.save();
  res.json(toPublicUser(user));
}

module.exports = { getUsers, updateUser, updateAccountSettings };
