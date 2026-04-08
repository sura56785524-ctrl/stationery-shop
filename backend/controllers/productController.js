const Product = require("../models/Product");

async function getProducts(req, res) {
  try {
    const { category, featured, trending, search, sort = "newest" } = req.query;
    const filter = {};

    if (category && category !== "all") filter.category = category.toLowerCase();
    if (featured === "true") filter.featured = true;
    if (trending === "true") filter.trending = true;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    let sortQuery = { createdAt: -1 };
    if (sort === "price-low") sortQuery = { price: 1 };
    if (sort === "price-high") sortQuery = { price: -1 };
    if (sort === "rating") sortQuery = { rating: -1 };

    const products = await Product.find(filter).sort(sortQuery);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products." });
  }
}

async function getProductById(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found." });
  res.json(product);
}

async function createProduct(req, res) {
  try {
    const payload = req.body;
    const product = await Product.create(payload);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Failed to create product." });
  }
}

async function updateProduct(req, res) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: "Product not found." });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Failed to update product." });
  }
}

async function deleteProduct(req, res) {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found." });
  res.json({ message: "Product deleted." });
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
