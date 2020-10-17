import * as actionType from "./actionType";

export const storeAuthData = (authData) => {
  return {
    type: actionType.STORE_AUTHDATA,
    authData
  };
};

export const logout = () => {
  return {
    type: actionType.LOGOUT,
  };
};
