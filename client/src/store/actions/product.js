import * as actionType from "./actionType";

export const storeProducts = (products) => {
  return {
    type: actionType.STORE_PRODUCTS,
    products,
  };
};
