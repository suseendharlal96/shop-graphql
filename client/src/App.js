import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Products from "./pages/Products";
import Auth from "./pages/Auth";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Products} />
          <Route path="/auth" component={Auth} />
          <Route path="/delete-product/:id" component={Products} />
          <Route path="/edit-product/:id" component={Products} />
          <Redirect from="**" to="/" />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
