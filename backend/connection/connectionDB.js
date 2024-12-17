const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async function fnConnectionDB() {
  try {
    if (!process.env.MONGODB_URI) {
      console.log(".env file missing");
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("Connected to DB Successfully");
  } catch (error) {
    console.log("Error During Connection", error.message);
    throw error;
  }
};
