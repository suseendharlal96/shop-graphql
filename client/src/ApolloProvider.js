import React from "react";
import {
  ApolloProvider as Provider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import App from "./App";

const token = localStorage.getItem("token");

const httpLink = createHttpLink({
  uri: "http://localhost:5000",
  headers: {
    authorization: token ? `Bearer ${token}` : "",
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
const ApolloProvider = () => {
  return (
    <Provider client={client}>
      <App />
    </Provider>
  );
};

export default ApolloProvider;
