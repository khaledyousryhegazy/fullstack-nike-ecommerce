const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      unique: true, // Ensure one cart per user
    },
    items: [
      {
        product: {
          type: Schema.Types.Mixed,
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalAmount: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

cartSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  next();
});

const Cart = model("Cart", cartSchema);

module.exports = Cart;
