require("dotenv").config();
const connectDB = require("../config/db");
const User = require("../models/User");

async function run() {
  const email = (process.argv[2] || "").toLowerCase().trim();
  if (!email) {
    console.error("Usage: node backend/data/makeAdmin.js <email>");
    process.exit(1);
  }

  try {
    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      console.error("User not found for email:", email);
      process.exit(1);
    }

    await User.updateMany({ role: "admin", _id: { $ne: user._id } }, { role: "customer" });
    user.role = "admin";
    await user.save();

    console.log("Single admin is now:", user.email);
    process.exit(0);
  } catch (error) {
    console.error("Failed to promote user:", error.message);
    process.exit(1);
  }
}

run();

