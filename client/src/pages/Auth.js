import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { useLazyQuery, useMutation, gql } from "@apollo/client";

import "./Auth.scss";
import { authFragment } from "../util/authFragment";
import * as actions from "../store/actions/index";
import Sample from "../components/Sample";

const Auth = (props) => {
  const [isSignup, setisSignup] = useState(false);
  const [form, setform] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const changeMode = () => {
    if (form.confirmPassword !== "") {
      setform({ ...form, confirmPassword: "" });
    }
    setErrors({});
    setisSignup(!isSignup);
  };

  const handleInputChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const [login, { loading }] = useLazyQuery(SIGN_IN, {
    onCompleted(data) {
      console.log(data);
      history.push("/");
      props.storeAuthData(data.signin);
    },
    onError(err) {
      console.log(err.graphQLErrors[0]);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  const [signup, { loading: signupLoading }] = useMutation(SIGN_UP, {
    onCompleted(data) {
      console.log(data);
      history.push("/");
      props.storeAuthData(data.signup);
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  const submitForm = (e) => {
    e.preventDefault();
    if (!isSignup) {
      login({ variables: form });
    } else {
      signup({ variables: form });
    }
  };

  return (
    <div className="auth-form">
      {/* <Sample label="Current Time" /> */}
      <h2>{isSignup ? "Signup" : "Signin"}</h2>
      {errors && errors.error && (
        <p className="invalid">{errors && errors.error}</p>
      )}
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="email" required>
            Email
          </label>
          <input
            type="text"
            name="email"
            autoFocus
            className="form-control"
            value={form.email}
            id="email"
            onChange={handleInputChange}
          />
        </div>
        {errors && errors.email && (
          <p className="invalid">{errors && errors.email}</p>
        )}
        <div>
          <label htmlFor="password" required>
            Password
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleInputChange}
          />
        </div>
        {errors && errors.password && (
          <p className="invalid">{errors && errors.password}</p>
        )}
        {isSignup && (
          <>
            <div>
              <label htmlFor="confirmPassword" required>
                Confirm Password
              </label>
              <input
                className="form-control"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={form.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            {errors && errors.confirmPassword && (
              <p className="invalid">{errors && errors.confirmPassword}</p>
            )}
          </>
        )}
        {/* <p v-if="errors && errors.error" className="invalid">
        { isSignup ? errors.error : "Invalid credentials" }
      </p> */}
        <button
          className="auth-button secondary"
          type="button"
          disabled={loading}
          onClick={changeMode}
        >
          Switch to {isSignup ? "Signin" : "Signup"}
        </button>
        <button className="auth-button primary" type="submit">
          {isSignup
            ? signupLoading
              ? "Signing up.."
              : "Signup"
            : loading
            ? "Signing in.."
            : "Signin"}
        </button>
      </form>
    </div>
  );
};

const SIGN_IN = gql`
  query signIn($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      ...authData
    }
  }
  ${authFragment}
`;

const SIGN_UP = gql`
  mutation signUp(
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signup(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      ...authData
    }
  }
  ${authFragment}
`;

const mapDispatchToProps = (dispatch) => {
  return {
    storeAuthData: (authData) => {
      dispatch(actions.storeAuthData(authData));
    },
  };
};

export default connect(null, mapDispatchToProps)(Auth);
