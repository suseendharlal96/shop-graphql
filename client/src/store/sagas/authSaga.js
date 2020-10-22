import { put } from "redux-saga/effects";

import * as actionType from "../actions/actionType";

export function* storeAuth(action) {
  yield put({
    type: actionType.STORE_AUTHDATA,
    authData: action.authData,
  });
}

export function* logoutSaga() {
  yield put({
    type: actionType.LOGOUT,
  });
}
