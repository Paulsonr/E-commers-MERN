import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProducts } from "../Shared/Store/actions/products.action";
import "./style/products.scss";

const env_var = process.env.REACT_APP_ENV_VAR;
const product_module = process.env.REACT_APP_PRODUCT_ROUTE;

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const [appTitle, setAppTitle] = useState("");
  const productModuleURL = `${env_var}${product_module}`;

  const handleProductClick = (productDetails) => {
    navigate(`/products/${productDetails._id}`);
  };

  useEffect(() => {
    axios.get(productModuleURL).then((res) => {
      dispatch(setProducts(res.data));
    });
  }, []);
  return (
    <>
      {" "}
      {!products ? (
        <div>Loading...</div>
      ) : (
        <div className="products_container">
          {products.map((product) => (
            <div
              className="product_card"
              onClick={() => handleProductClick(product)}
            >
              <div className="img_box">
                <img src={product.image} alt="product_img" />
              </div>
              <div className="product_title">{product.name}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Products;
