const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCartItems,
  deleteCartItem,
  updateCartItem,
} = require("../controllers/cart.controller");

router.post("/", addToCart);
router.get("/", getCartItems);
router.delete("/:id", deleteCartItem);
router.put("/:id", updateCartItem);

module.exports = router;
