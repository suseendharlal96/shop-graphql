import { takeEvery, all } from "redux-saga/effects";

import * as actionType from "../actions/actionType";
import { storeAuth, logoutSaga } from "./authSaga";
import { storeProductsSaga, storePaginationSaga } from "./productSaga";

export function* watchAuth() {
  yield all([
    takeEvery(actionType.STORE_AUTHDATA_SAGA, storeAuth),
    takeEvery(actionType.LOGOUT_SAGA, logoutSaga),
  ]);
}

export function* watchProduct() {
  yield takeEvery(actionType.STORE_PRODUCTS_SAGA, storeProductsSaga);
  yield takeEvery(actionType.STORE_PAGINATION_SAGA, storePaginationSaga);
}
