import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import "./index.css";
import productReducer from "./store/reducers/product";
import ApolloProvider from "./ApolloProvider";

const rootReducer = combineReducers({
  productReducer,
});

const store = createStore(rootReducer);

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
