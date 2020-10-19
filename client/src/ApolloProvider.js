import React from "react";
import {
  ApolloProvider as Provider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "apollo-link-context";
import App from "./App";

const httpLink = createHttpLink({
  uri: "http://localhost:5000",
});

const authLink = setContext(() => {
  return {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}` || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
