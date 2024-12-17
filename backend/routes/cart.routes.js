const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  decrementQuantity,
} = require("../controllers/cart.controller");

// Routes
router.post("/add", addToCart);
router.get("/:userId", getCart);
router.delete("/remove", removeFromCart);
router.post("/decrement", decrementQuantity);

module.exports = router;
