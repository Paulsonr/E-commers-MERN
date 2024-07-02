import { SET_BRUDCRUMB } from "../types/app.type";

const initialState = {
  brudcrumb: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BRUDCRUMB:
      return {
        ...state,
        brudcrumb: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
