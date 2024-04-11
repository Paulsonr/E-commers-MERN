const Product = require("../model/product.model");

//CREATE PRODUCT
const addProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//READ PRODUCT
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductDetail = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const productDetail = await Product.findById(productId);
    res.status(200).json(productDetail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findByIdAndUpdate(productId, req.body);
    if (!product)
      return res.status(404).json({ message: "Product not found!" });
    const updatedProduct = await Product.findById(product.id);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);
    if (!product)
      return res.status(400).json({ message: "Product not found!" });
    res.status(200).json({
      message: `Product with id: ${productId} is deleted successfully!`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductDetail,
  updateProduct,
  deleteProduct,
};
