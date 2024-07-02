import { combineReducers } from "redux";
import productsReducer from "./products.reducer";
import appReducer from "./app.reducer";

const rootReducer = combineReducers({
  products: productsReducer,
  app: appReducer,
});

export default rootReducer;
