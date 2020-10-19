import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../store/actions/index";
import "./Navbar.scss";

const Navbar = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [showLink, setshowLink] = useState(false);
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
                onClick={() => navigate("/")}
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
