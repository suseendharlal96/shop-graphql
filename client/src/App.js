import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Products from "./pages/Products";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Products} />
        <Redirect from="**" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
