import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Products from "./pages/Products";
import Auth from "./pages/Auth";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/auth" component={Auth} />
            <Redirect from="**" to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
