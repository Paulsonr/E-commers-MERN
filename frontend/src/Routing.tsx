import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//pages
import Products from "./Pages/Products";
import ProductDetail from "./Pages/productDetail";
import Cart from "./Pages/cart";

export default () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Products />}/>
          <Route path="/" element={<Products />}/>
          <Route path="/" element={<Products />}/>
        </Routes>
      </Router>
  )
}
