import * as actionType from "../actions/actionType";

const initState = {
  products: null,
  errors: null,
  paginationInfo: null,
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.STORE_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };

    case actionType.STORE_PAGINATION:
      return {
        ...state,
        paginationInfo: action.paginationInfo,
      };

    default:
      return state;
  }
};

export default productReducer;
