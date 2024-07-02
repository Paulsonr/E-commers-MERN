import { SET_BRUDCRUMB } from "../types/app.type";

export const setBrudcrumb = (data) => {
  return {
    type: SET_BRUDCRUMB,
    payload: data,
  };
};
