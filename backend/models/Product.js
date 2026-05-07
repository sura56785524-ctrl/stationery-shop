const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true, lowercase: true },
    imageURL: { type: String, default: "https://via.placeholder.com/300x300?text=Stationery" },
    stock: { type: Number, required: true, min: 0 },
    brand: { type: String, default: "" },
    rating: { type: Number, default: 4 },
    reviewCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
