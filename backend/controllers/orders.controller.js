// checkout and orders
const Order = require("../models/orders.model");
const Cart = require("../models/cart.model");

// get all orders [ADMIN ONLY]
const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const orders = await Order.find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Checkout and create a new order
const createOrder = async (req, res) => {
  const { userId, shippingAddress, paymentMethod } = req.body;

  try {
    // Fetch user's cart
    const cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        msg: "Cart is empty. Add items before checkout.",
      });
    }

    // Prepare order data
    const orderItems = cart.items.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));

    const totalAmount = cart.totalAmount;

    // Create and save the new order
    const newOrder = new Order({
      userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    await newOrder.save();

    // Clear user's cart after order creation
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json({
      success: true,
      msg: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get all orders for a specific user
const getUserOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Update the status of an order
const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  if (!orderId || !status) {
    return res.status(400).json({ success: false, msg: "Invalid data" });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, msg: "Order not found" });
    }

    // Update the order status
    order.status = status;
    await order.save();

    res.status(200).json({ success: true, msg: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  getUserOrders,
  updateOrderStatus,
};
