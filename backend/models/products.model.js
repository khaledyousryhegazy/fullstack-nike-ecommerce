const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    image: { type: String },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    gender: {
      type: String,
      required: true,
      enum: ["men's", "women's", "girls", "boys"],
    },
    ageGroup: {
      type: String,
      required: true,
      enum: ["adults", "children"],
    },
  },
  { timestamps: true }
);

const Product = model("Products", productSchema);

module.exports = Product;
