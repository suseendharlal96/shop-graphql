import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleWare from "redux-saga";
import logger from "redux-logger";

import "./index.css";
import productReducer from "./store/reducers/product";
import authReducer from "./store/reducers/auth";
import ApolloProvider from "./ApolloProvider";
import { watchAuth, watchProduct } from "./store/sagas/index";

const rootReducer = combineReducers({
  authReducer,
  productReducer,
});

const sagaMiddleware = createSagaMiddleWare();
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware, logger))
);
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchProduct);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
