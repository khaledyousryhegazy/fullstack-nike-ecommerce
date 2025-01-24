const express = require("express");
const {
  getAllUsers,
  register,
  login,
  updateUserRole,
  deleteUser,
} = require("../controllers/user.controller");

const auth = require("../middlewares/auth");
const adminAuth = require("../middlewares/adminAuth");

const router = express.Router();

// Routes
// router.get("/all", auth, adminAuth, getAllUsers); // Admin-only
router.get("/all", getAllUsers); // Admin-only
router.post("/register", register);
router.post("/login", login);
router.put("/update-role", auth, adminAuth, updateUserRole); // Admin-only
// router.delete("/delete/:userId", auth, adminAuth, deleteUser); // Admin-only
router.delete("/delete/:userId", deleteUser); // Admin-only

module.exports = router;
