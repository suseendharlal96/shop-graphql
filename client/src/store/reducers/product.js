import * as actionType from "../actions/actionType";

const initState = {
  products: null,
  errors: null,
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.STORE_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    default:
      return state;
  }
};

export default productReducer;
