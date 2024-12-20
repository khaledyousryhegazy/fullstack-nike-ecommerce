const Product = require("../models/products.model");

const getAllProducts = async (req, res) => {
  try {
    const { gender, ageGroup, page = 1, limit = 7 } = req.query;

    const filters = {};
    if (gender) filters.gender = { $in: gender.split(",") };
    if (ageGroup) filters.ageGroup = { $in: ageGroup.split(",") };

    const skip = (page - 1) * limit;
    const products = await Product.find(filters)
      .skip(skip)
      .limit(parseInt(limit));

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

module.exports = { getAllProducts };
