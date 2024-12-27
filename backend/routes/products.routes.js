const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const router = express.Router();

router.get("/products", getAllProducts); // Get all products
router.get("/products/:id", getSingleProduct); // Get single product
router.post("/products", createProduct); // Create a new product
router.put("/products/:id", editProduct); // Edit an existing product
router.delete("/products/:id", deleteProduct); // Delete a product

module.exports = router;
