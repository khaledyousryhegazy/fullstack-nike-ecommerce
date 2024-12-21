const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
} = require("../controllers/products.controller");
const router = express.Router();

// Route to get all products
router.get("/products", getAllProducts);

router.get("/products/:id", getSingleProduct);

module.exports = router;
