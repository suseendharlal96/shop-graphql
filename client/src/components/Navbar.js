import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../store/actions/index";
import "./Navbar.scss";

const Navbar = (props) => {
  const history = useHistory();
  const navigate = (path, isLogout = false) => {
    if (isLogout) {
      props.logout();
    }
    history.push(path);
  };

  return (
    <nav className="navbar">
      <div className="brand">ReactKart</div>
      <div className="nav-links">
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          {props.email ? (
            <>
              <li onClick={() => navigate("/")}>Cart</li>
              <li onClick={() => navigate("/")}>Orders</li>
              <li onClick={() => navigate("/auth", true)}>Logout</li>
            </>
          ) : (
            <li onClick={() => navigate("/auth")}>Signin/Signup</li>
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
