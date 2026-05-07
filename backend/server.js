require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const assistantRoutes = require("./routes/assistantRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "inkspire-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/assistant", assistantRoutes);

const rootDir = path.resolve(__dirname, "..");
app.use(express.static(rootDir));

app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(rootDir, "index.html"));
});

async function ensureAdminFromEnv() {
  const email = (process.env.AUTO_ADMIN_EMAIL || "").trim().toLowerCase();
  const password = process.env.AUTO_ADMIN_PASSWORD || "";
  const name = (process.env.AUTO_ADMIN_NAME || "Admin").trim();

  if (!email || !password) return;

  const passwordHash = await bcrypt.hash(password, 12);
  const existing = await User.findOne({ email });

  if (existing) {
    existing.name = existing.name || name;
    existing.passwordHash = passwordHash;
    existing.role = "admin";
    await existing.save();
    console.log(`Admin bootstrap: updated ${email}`);
    return;
  }

  await User.create({
    name,
    email,
    passwordHash,
    role: "admin",
  });
  console.log(`Admin bootstrap: created ${email}`);
}

async function start() {
  try {
    await connectDB();
    await ensureAdminFromEnv();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
}

start();
