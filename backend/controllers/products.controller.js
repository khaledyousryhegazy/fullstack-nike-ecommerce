const Product = require("../models/products.model");

// Get all products
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

//  Get single product
const getSingleProduct = async (req, res) => {
  try {
    const ID = req.params.id;

    const product = await Product.findById(ID);

    if (!product) {
      res.status(500).json({ message: "Error fetching products", error });
      return;
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Create new product
const createProduct = async (req, res) => {
  try {
    const { image, title, description, price, category, gender, ageGroup } =
      req.body;

    const newProduct = new Product({
      image,
      title,
      description,
      price,
      category,
      gender,
      ageGroup,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      data: newProduct,
      message: "Product created successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: err.message,
    });
  }
};

// Edit product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: err.message,
    });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully!" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: err.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  editProduct,
  deleteProduct,
};
