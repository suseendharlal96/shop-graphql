import * as actionType from "./actionType";

export const storeProducts = (products) => {
  return {
    type: actionType.STORE_PRODUCTS_SAGA,
    products,
  };
};

export const storePaginationInfo = (data) => {
  return {
    type: actionType.STORE_PAGINATION_SAGA,
    paginationInfo: data,
  };
};
