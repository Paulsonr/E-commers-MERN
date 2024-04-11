const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProductDetail,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");

router.post("/", addProduct);
router.get("/", getProducts);
router.get("/:id", getProductDetail);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
