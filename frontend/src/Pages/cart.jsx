import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const env_var = process.env.REACT_APP_ENV_VAR;
const cart_module = process.env.REACT_APP_CART_ROUTE;
function Cart() {
  const cartModuleURL = `${env_var}${cart_module}`;
  const [cartData, setCartData] = useState({ items: [], totalPrice: 0 });
  const handleRemoveCartItem = (cartItemId) => {
    axios
      .delete(`${cartModuleURL}/${cartItemId}`)
      .then((res) => {
        setCartData(res.data.cart);
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    axios
      .get(cartModuleURL)
      .then((res) => {
        setCartData(res.data[0]);
        console.log(res);
      })
      .catch((error) => toast.error(error));
  }, []);
  return (
    <div>
      <h1>Cart</h1>
      <>
        {!cartData ? (
          <>Loading...</>
        ) : (
          <>
            {cartData?.items?.map((item) => (
              <div key={item.item._id}>
                <img
                  src={item.item.image}
                  alt={item.item.name}
                  width={"60px"}
                  height={"60px"}
                />
                <h3>{item.item.name}</h3>
                <p>{item.item.price}</p>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemoveCartItem(item.item._id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </>
        )}
        <h3>Total: {cartData.totalPrice}</h3>
        <Button variant="contained" color="error">
          Checkout
        </Button>
      </>
    </div>
  );
}

export default Cart;
