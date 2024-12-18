const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
} = require("../controllers/orders.controller");

// Route to place a new order (checkout)
router.post("/checkout", createOrder);

// Route to get all orders for a user
router.get("/user/:userId", getUserOrders);

module.exports = router;
