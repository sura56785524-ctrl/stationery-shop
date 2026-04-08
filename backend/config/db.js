const mongoose = require("mongoose");

async function connectDB() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
  }

  await mongoose.connect(mongoUri, {
    dbName: process.env.MONGODB_DB || "inkspire_shop",
    serverSelectionTimeoutMS: 8000,
  });

  console.log("MongoDB connected.");
}

module.exports = connectDB;
