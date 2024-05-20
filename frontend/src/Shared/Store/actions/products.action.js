import { SET_PRODUCTS } from "../types/products.type";

export const setProducts = (data) => {
  return {
    type: SET_PRODUCTS,
    payload: {
      products: data,
    },
  };
};
