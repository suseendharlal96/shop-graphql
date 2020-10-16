import * as actionType from "./actionType";

export const storeToken = (email, token) => {
  return {
    type: actionType.STORE_TOKEN,
    token,
    email,
  };
};

export const logout = () => {
  return {
    type: actionType.LOGOUT,
  };
};
