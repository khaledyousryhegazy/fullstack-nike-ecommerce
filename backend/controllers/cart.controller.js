const Cart = require("../models/cart.model");
const Product = require("../models/products.model");

const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId }).populate("items.product");
    if (!cart) {
      return res.status(404).json({
        success: false,
        msg: "Cart not found",
      });
    }

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;

    // Fetch the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        msg: "Product not found",
      });
    }

    // Fetch the user's cart or create a new one
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find(
      (item) => item.product._id.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity; // Update quantity
    } else {
      // Add the product with quantity to the cart
      cart.items.push({ product, quantity });
    }

    // Save the cart
    await cart.save();

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ success: false, msg: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => !item.product._id.equals(productId)
    );

    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const decrementQuantity = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Find the cart for the user
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, msg: "Cart not found" });
    }

    // Find the item in the cart
    const item = cart.items.find(
      (item) => item.product._id.toString() === productId
    );
    if (!item) {
      return res
        .status(404)
        .json({ success: false, msg: "Product not found in cart" });
    }

    // Decrement the quantity or remove the item if quantity becomes 0
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.items = cart.items.filter(
        (item) => item.product._id.toString() !== productId
      );
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  decrementQuantity,
};
