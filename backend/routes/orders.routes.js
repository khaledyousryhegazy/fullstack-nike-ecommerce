const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getAllOrders,
} = require("../controllers/orders.controller");
const auth = require("../middlewares/Auth");
const adminAuth = require("../middlewares/adminAuth");

// Get all orders [ADMIN ONLY]
router.get("/all", getAllOrders);

// Route to place a new order (checkout)
router.post("/checkout", auth, createOrder);

// Route to get all orders for a user
router.get("/user/:userId", auth, getUserOrders);

// Route to get all orders for a user
// router.post("/update-status", auth, adminAuth, updateOrderStatus);
router.post("/update-status", updateOrderStatus);

module.exports = router;
