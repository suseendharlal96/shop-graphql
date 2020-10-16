import * as actionType from "../actions/actionType";

const initState = {
  email: null,
  token: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.STORE_TOKEN:
      return {
        ...state,
        email: action.email,
        token: action.token,
      };

    case actionType.LOGOUT:
      return {
        ...state,
        email: "",
        token: "",
      };

    default:
      return state;
  }
};

export default authReducer;
