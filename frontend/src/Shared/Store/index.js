import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

//store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
