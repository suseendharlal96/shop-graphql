import * as actionType from "../actions/actionType";

const initState = {
  email: null,
  token: null,
  id: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.STORE_AUTHDATA:
      localStorage.setItem("token", action.authData.token);
      return {
        ...state,
        email: action.authData.email,
        token: action.authData.token,
        id: action.authData.id,
      };

    case actionType.LOGOUT:
      localStorage.clear();
      return {
        ...state,
        email: null,
        token: null,
        id: null,
      };

    default:
      return state;
  }
};

export default authReducer;
