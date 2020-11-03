import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../store/actions/index";
import "./Navbar.scss";
import { useThemeState, useThemeDispatch } from "../context/themecontext";

const Navbar = (props) => {
  const state = useThemeState();
  const dispatch = useThemeDispatch();
  const history = useHistory();
  const location = useLocation();
  const [showLink, setshowLink] = useState(false);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.theme);
  }, [state]);
  const navigate = (path, isLogout = false) => {
    if (isLogout) {
      props.logout();
    }
    setshowLink(false);
    history.push(path);
  };

  const toggle = () => {
    setshowLink(!showLink);
  };

  const themeHandler = () => {
    state.theme === "light"
      ? dispatch({ type: "dark" })
      : dispatch({ type: "light" });
    setshowLink(false);
  };

  return (
    <nav className="navbar">
      <div className="brand">ReactKart</div>
      <a className="toggle" onClick={toggle}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </a>
      <div className={showLink ? "nav-links active" : "nav-links"}>
        <ul>
          <li
            className={
              location.pathname === "/" ||
              location.pathname.search("/delete") !== -1 ||
              location.pathname.search("/add") !== -1 ||
              location.pathname.search("/edit") !== -1
                ? "active"
                : ""
            }
            onClick={() => navigate("/")}
          >
            Home
          </li>
          {props.email ? (
            <>
              <li
                className={location.pathname === "/cart" ? "active" : ""}
                onClick={() => navigate("/cart")}
              >
                Cart
              </li>
              <li
                className={location.pathname === "/orders" ? "active" : ""}
                onClick={() => navigate("/orders")}
              >
                Orders
              </li>
              <li
                className={location.pathname === "/auth" ? "active" : ""}
                onClick={() => navigate("/auth", true)}
              >
                Logout
              </li>
              <li className="email">{props.email}</li>
            </>
          ) : (
            <li
              className={location.pathname === "/auth" ? "active" : ""}
              onClick={() => navigate("/auth")}
            >
              Signin/Signup
            </li>
          )}
          <li onClick={() => themeHandler()}>
            {state.theme === "light" ? "Dark theme" : "Light theme"}
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.authReducer.email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
