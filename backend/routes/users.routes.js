const express = require("express");
const {
  getAllUsers,
  register,
  login,
} = require("../controllers/user.controller");
const auth = require("../middlewares/Auth");
const router = express.Router();

router.get("/all", auth, getAllUsers);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
