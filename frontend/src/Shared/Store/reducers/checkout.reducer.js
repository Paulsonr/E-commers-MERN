import { SET_PRODUCTS_TO_CHECKOUT } from "../types/checkout.type";

const initialState = {
  CheckoutProducts: [],
  totalCheckoutPrice: 0,
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS_TO_CHECKOUT:
      let total = 0;
      action.payload.forEach((item) => {
        total += item.price * item.qty;
      });
      return {
        ...state,
        CheckoutProducts: action.payload,
        totalCheckoutPrice: total,
      };
    default:
      return state;
  }
};

export default checkoutReducer;
