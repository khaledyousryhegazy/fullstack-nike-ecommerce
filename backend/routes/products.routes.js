const express = require("express");
const { getAllProducts } = require("../controllers/products.controller");
const router = express.Router();

// Route to get all products
router.get("/products", getAllProducts);

module.exports = router;
