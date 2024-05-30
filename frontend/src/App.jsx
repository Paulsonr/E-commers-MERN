import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./Context/userContext";
// //pages
import Home from "./Pages/home";
import SignIn from "./Pages/signin";
import SignUp from "./Pages/signup";
import Products from "./Pages/products";
import ProductDetail from "./Pages/productDetail";
import Cart from "./Pages/cart";
//
import "./App.css";

axios.defaults.withCredentials = true;

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      // case "/signin":
      //   title = "";
      //   metaDescription = "";
      //   break;
      // case "/homepage":
      //   title = "";
      //   metaDescription = "";
      //   break;
      case "/signup":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <UserContextProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* <Router> */}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
      {/* </Router> */}
    </UserContextProvider>
  );
}

export default App;
