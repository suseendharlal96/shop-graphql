import { put } from "redux-saga/effects";

import * as actionType from "../actions/actionType";

export function* storeProductsSaga(action) {
  yield put({
    type: actionType.STORE_PRODUCTS,
    products: action.products,
  });
}

export function* storePaginationSaga(action) {
  yield put({
    type: actionType.STORE_PAGINATION,
    paginationInfo: action.paginationInfo,
  });
}
