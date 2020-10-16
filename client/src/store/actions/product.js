import * as actionType from "./actionType";

export const storeProducts = (products) => {
  return {
    type: actionType.STORE_PRODUCTS,
    products,
  };
};

export const storePaginationInfo = (data) => {
  return {
    type: actionType.STORE_PAGINATION,
    paginationInfo: data,
  };
};
