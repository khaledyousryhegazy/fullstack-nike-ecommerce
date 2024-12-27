const User = require("../models/users.model");
const Cart = require("../models/cart.model");
const jwt = require("jsonwebtoken");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Register a new user
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists" });
    }

    // Create and save new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Create a cart for the new user
    const newCart = new Cart({ userId: newUser._id, items: [] });
    await newCart.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "90d",
    });

    res.status(201).json({
      success: true,
      token: token,
      user: newUser,
      cart: newCart,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Login a user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, msg: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "90d",
    });
    res.status(200).json({ success: true, token: token, user: user });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Update user role (Admin-only)
const updateUserRole = async (req, res) => {
  const { userId, newRole } = req.body;

  try {
    // Assuming req.user contains the logged-in user
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, msg: "Only admins can update roles" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    user.role = newRole;
    await user.save();

    res.status(200).json({
      success: true,
      msg: "User role updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = { getAllUsers, register, login, updateUserRole };
