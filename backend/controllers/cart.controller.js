const mongoose = require("mongoose");
const Cart = require("../model/cart.model");
const Product = require("../model/product.model");

//ADD PRODUCTS TO CART
const addToCart = async (req, res) => {
  try {
    const { ProductId } = req.body;

    // Validate the ProductId
    if (!mongoose.Types.ObjectId.isValid(ProductId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Find the product by ID
    const foundProduct = await Product.findById(ProductId);
    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find the cart or create a new cart if it doesn't exist
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart();
    }

    // Check if the product already exists in the cart
    const productIndex = cart.items.findIndex((item) =>
      item.item._id.equals(ProductId)
    );
    if (productIndex > -1) {
      // If it exists, increase the quantity
      cart.items[productIndex].qty += 1;
      cart.items[productIndex].price += foundProduct.price;
    } else {
      // If it doesn't exist, add it to the items array
      cart.items.push({
        item: {
          _id: foundProduct._id,
          name: foundProduct.name,
          image: foundProduct.image, // Changed from description to image
          price: foundProduct.price,
          // Add other product fields as necessary
        },
        qty: 1,
      });
    }

    // Update the total price
    cart.totalPrice += foundProduct.price;

    // Save the updated cart
    await cart.save();

    res
      .status(200)
      .json({ message: "Product added to cart successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//READ CART PRODUCTS
const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.find({});
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//DELETE ITEM FROM CART
const deleteCartItem = async (req, res) => {
  try {
    const { id: CartItemId } = req.params;

    // Validate the ProductId
    if (!mongoose.Types.ObjectId.isValid(CartItemId)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    // Find the item by ID
    const foundItem = await Product.findById(CartItemId);

    // Find the cart or create a new cart if it doesn't exist
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart();
    }

    // Check if the product already exists in the cart
    const itemIndex = cart.items.findIndex((item) =>
      item.item._id.equals(CartItemId)
    );
    if (itemIndex > -1) {
      // If the item already exists in the cart delete it
      cart.items.splice(itemIndex, 1);
    }

    // Update the total price
    cart.totalPrice -= foundItem.price;

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Cart Updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  deleteCartItem,
};
