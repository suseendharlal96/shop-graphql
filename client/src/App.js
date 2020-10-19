import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Products from "./pages/Products";
import Auth from "./pages/Auth";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import "./App.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div style={{ marginTop: "54px" }}>
          <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/auth" component={Auth} />
            <Route path="/cart" component={Cart} />
            <Route path="/orders" component={Orders} />
            <Route path="/add-product" component={Products} />
            <Route path="/delete-product/:id" component={Products} />
            <Route path="/edit-product/:id" component={Products} />
            <Redirect from="**" to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
