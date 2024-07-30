import { combineReducers } from "redux";
import productsReducer from "./products.reducer";
import appReducer from "./app.reducer";
import checkoutReducer from "./checkout.reducer";

const rootReducer = combineReducers({
  products: productsReducer,
  app: appReducer,
  checkout: checkoutReducer,
});

export default rootReducer;
