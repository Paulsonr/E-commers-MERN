import { SET_PRODUCTS } from "../types/products.type";

const initialState = {
  products: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
      };
    default:
      return state;
  }
};

export default productsReducer;
