import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const env_var = process.env.REACT_APP_ENV_VAR;
const product_module = process.env.REACT_APP_PRODUCT_ROUTE;
const cart_module = process.env.REACT_APP_CART_ROUTE;
function ProductDetail() {
  const { id } = useParams();
  const productModuleURL = `${env_var}${product_module}`;
  const cartModuleURL = `${env_var}${cart_module}`;
  const [productDetails, setProductDetails] = useState({});
  const getProductDetails = () => {
    axios.get(`${productModuleURL}/${id}`).then((res) => {
      setProductDetails(res.data);
    });
  };

  const handleAddToCart = async () => {
    let payload = {
      ProductId: id,
    };
    await axios.post(cartModuleURL, payload).then((res) => {
      toast.success(res.data.message);
    });
  };
  useEffect(() => {
    getProductDetails();
  }, [id]);
  return (
    <>
      {!productDetails ? (
        <>Loading....</>
      ) : (
        <div>
          <img
            src={productDetails.image}
            alt="product_img"
            width={"250px"}
            height={"250px"}
          />
          <h1>{productDetails.name}</h1>
          <p>{productDetails.price}</p>
          <div className="action_btns">
            <Button onClick={handleAddToCart} variant="contained">
              Add to Cart
            </Button>
            <Button variant="contained" color="warning">
              Buy Now
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetail;
