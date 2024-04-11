const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: "string",
    required: [true, "Please enter a name"],
  },
  price: {
    type: "number",
    required: true,
  },
  image: {
    type: "string",
    required: false,
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
