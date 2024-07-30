import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { setProductsToCheckout } from "../Shared/Store/actions/checkout.action";

const env_var = process.env.REACT_APP_ENV_VAR;
const cart_module = process.env.REACT_APP_CART_ROUTE;
function Cart() {
  const cartModuleURL = `${env_var}${cart_module}`;
  const [cartData, setCartData] = useState({ items: [], totalPrice: 0 });
  const params = useParams();
  const navigate = useNavigate();
  //redux
  const dispatch = useDispatch();

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

  const handleUpdateCart = (cartId, quantity) => {
    axios
      .put(`${cartModuleURL}/${cartId}`, { qty: quantity })
      .then((res) => {
        setCartData(res.data.cart);
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleCheckout = () => {
    dispatch(setProductsToCheckout(cartData.items));
    navigate("/checkout");
  };

  useEffect(() => {
    axios
      .get(cartModuleURL)
      .then((res) => {
        setCartData(res.data);
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
            {cartData?.items.length ? (
              cartData.items.map((item) => (
                <div key={item._id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    width={"60px"}
                    height={"60px"}
                  />
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                  <div className="d-flex">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleUpdateCart(item._id, item.qty + 1)}
                      // disabled={item.qty >= item.item.countInStock}
                    >
                      +
                    </Button>
                    <div>{item.qty}</div>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleUpdateCart(item._id, item.qty - 1)}
                      disabled={item.qty <= 1}
                    >
                      -
                    </Button>
                  </div>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveCartItem(item._id)}
                  >
                    Remove
                  </Button>
                </div>
              ))
            ) : (
              <h3>No items in cart</h3>
            )}
          </>
        )}
        <h3>Total: {cartData.totalPrice}</h3>
        <Button
          variant="contained"
          color="error"
          disabled={cartData?.items.length === 0}
          onClick={() => handleCheckout()}
        >
          Checkout
        </Button>
      </>
    </div>
  );
}

export default Cart;
