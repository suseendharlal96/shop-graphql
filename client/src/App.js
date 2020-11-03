import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Products from "./pages/Products";
import Auth from "./pages/Auth";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import "./App.css";
import { ThemeProvider } from "./context/themecontext";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <Navbar />
          <div
            style={{
              marginTop: "54px",
              height: "100vh",
              backgroundColor: "var(--primaryBg)",
            }}
          >
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
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
