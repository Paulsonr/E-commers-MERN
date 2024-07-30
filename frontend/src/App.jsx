import React, { useEffect } from "react";
import {
  Routes,
  Route,
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
import Profile from "./Pages/profile";
import Checkout from "./Pages/checkout";
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
      default:
        title = "";
        metaDescription = "";
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
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<Home />}>
          {/* {PageRoutes} */}
          <Route index path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<Profile />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
