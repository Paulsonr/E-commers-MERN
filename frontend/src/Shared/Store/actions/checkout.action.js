import { SET_PRODUCTS_TO_CHECKOUT } from "../types/checkout.type";

export const setProductsToCheckout = (data) => {
  return {
    type: SET_PRODUCTS_TO_CHECKOUT,
    payload: data,
  };
};
