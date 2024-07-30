const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  //   owner: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
  totalPrice: { type: Number, default: 0 },
  items: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      image: String, // Changed from description to image
      price: Number,
      // Add other product fields as necessary
      qty: { type: Number, default: 1 },
    },
  ],
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
