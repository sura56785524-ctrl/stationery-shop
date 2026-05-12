require("dotenv").config();
const connectDB = require("../config/db");
const Product = require("../models/Product");
const Category = require("../models/Category");

const categories = ["notebooks", "pens", "pencils", "art-supplies", "paper", "organizers"];

function buildProducts() {
  const amharicCategories = {
    notebooks: "የመጽሐፍ መዋቻ",
    pens: "እራሳ",
    pencils: "የእራሳ",
    "art-supplies": "የጥበብ እቃ",
    paper: "ወረታ",
    organizers: "አሰልፍ ማስተኛ",
  };

  const products = [];
  for (const category of categories) {
    for (let i = 1; i <= 10; i += 1) {
      const price = (8 + i * 2 + (category.length % 5)) * 55; // Convert USD to ETB (approximate rate)
      const titleEn = `${category.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())} Item ${i}`;
      const titleAm = `${amharicCategories[category]} ቁጥር ${i}`;
      products.push({
        title: titleEn,
        titleAm: titleAm,
        description: `Premium ${category} product #${i} designed for everyday productivity and creative work.`,
        descriptionAm: `ለዕለታዊ ምርታማነት እና ለፈጠራ ስራ ተብሎ የተዘጋጀ ከፍተኛ ጥራት ያለው ${amharicCategories[category]} ቁጥር ${i}።`,
        price,
        originalPrice: Number((price * 1.25).toFixed(2)),
        category,
        imageURL: `https://picsum.photos/seed/${category}-${i}/600/600`,
        stock: 20 + i * 3,
        brand: "SmartStationery",
        rating: Number((3.8 + (i % 3) * 0.4).toFixed(1)),
        reviewCount: 20 + i * 7,
        featured: i <= 4,
        trending: i % 2 === 0,
        tags: [category, "stationery", `item-${i}`],
      });
    }
  }
  return products;
}

async function runSeed() {
  try {
    await connectDB();
    console.log("Clearing existing products and categories...");
    await Product.deleteMany({});
    await Category.deleteMany({});

    await Category.insertMany(
      categories.map((slug) => ({
        slug,
        name: slug.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        description: `${slug} collection`,
      }))
    );

    const sampleProducts = buildProducts();
    await Product.insertMany(sampleProducts);
    console.log(`Seed complete. Inserted ${sampleProducts.length} products.`);
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
}

runSeed();
