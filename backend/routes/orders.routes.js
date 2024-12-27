const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  updateOrderStatus,
} = require("../controllers/orders.controller");
const auth = require("../middlewares/Auth");
const adminAuth = require("../middlewares/adminAuth");

// Route to place a new order (checkout)
router.post("/checkout", auth, createOrder);

// Route to get all orders for a user
router.get("/user/:userId", auth, getUserOrders);

// Route to get all orders for a user
router.post("/update-status", auth, adminAuth, updateOrderStatus);

module.exports = router;
