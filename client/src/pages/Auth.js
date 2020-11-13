import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";

import { useLazyQuery, useMutation, gql } from "@apollo/client";

import "./Auth.scss";
import { authFragment } from "../util/authFragment";
import * as actions from "../store/actions/index";
// import Sample from "../components/Sample";

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
      history.push("/");
      props.storeAuthData(data.signin);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  const [signup, { loading: signupLoading }] = useMutation(SIGN_UP, {
    onCompleted(data) {
      history.push("/");
      props.storeAuthData(data.signup);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  const submitForm = (values) => {
    // e.preventDefault();
    if (!isSignup) {
      login({ variables: values });
    } else {
      signup({ variables: values });
    }
  };

  const emailValidate = (value) => {
    const regEx = /^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$/;
    if (!value) {
      return "Required Field.";
    } else if (!value.match(regEx)) {
      return "Invalid Email.";
    }
  };

  let pass;
  const passwordValidate = (value) => {
    pass = value;
    if (!value) {
      return "Required Field.";
    } else if (value && value.length < 6) {
      return "Must be atleast 6 characters.";
    }
  };

  const confirmPasswordValidate = (value) => {
    if (!value) {
      return "Required Field.";
    } else if (pass && pass !== value) {
      return "Password mismatch.";
    }
  };

  return (
    <div className="auth-form">
      {/* <Sample label="Current Time" /> */}
      <h2>{isSignup ? "Signup" : "Signin"}</h2>
      {errors && errors.error && (
        <p className="invalid">{errors && errors.error}</p>
      )}
      <Form
        onSubmit={submitForm}
        render={({ handleSubmit, form, invalid }) => (
          <form onSubmit={handleSubmit}>
            <Field name="email" validate={emailValidate}>
              {({ input, meta }) => (
                <div>
                  <label htmlFor="email" required>
                    Email
                  </label>
                  <input
                    type="text"
                    {...input}
                    autoFocus
                    className="form-control"
                    placeholder="Email"
                    id="email"
                  />
                  {meta.error && meta.touched && (
                    <p className="invalid">{meta.error}</p>
                  )}
                  {errors && errors.email && (
                    <p className="invalid">{errors && errors.email}</p>
                  )}
                </div>
              )}
            </Field>
            <Field name="password" validate={passwordValidate}>
              {({ input, meta }) => (
                <div>
                  <label htmlFor="password" required>
                    Password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    placeholder="Password"
                    {...input}
                  />
                  {meta.touched && meta.error && (
                    <p className="invalid">{meta.error}</p>
                  )}
                  {errors && errors.password && (
                    <p className="invalid">{errors && errors.password}</p>
                  )}
                </div>
              )}
            </Field>
            {isSignup && (
              <Field name="confirmPassword" validate={confirmPasswordValidate}>
                {({ input, meta }) => (
                  <div>
                    <label htmlFor="confirmPassword" required>
                      Confirm Password
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      id="confirmPassword"
                      placeholder="Retype password"
                      {...input}
                    />
                    {meta.touched && meta.error && (
                      <p className="invalid">{meta.error}</p>
                    )}
                    {errors && errors.confirmPassword && (
                      <p className="invalid">
                        {errors && errors.confirmPassword}
                      </p>
                    )}
                  </div>
                )}
              </Field>
            )}
            {errors && errors.error && (
              <p className="invalid">{errors.error}</p>
            )}
            <button
              className="auth-button secondary"
              type="button"
              disabled={loading}
              onClick={() => form.reset && setisSignup(!isSignup)}
            >
              Switch to {isSignup ? "Signin" : "Signup"}
            </button>
            <button
              className="auth-button primary"
              disabled={invalid}
              type="submit"
            >
              {isSignup
                ? signupLoading
                  ? "Signing up.."
                  : "Signup"
                : loading
                ? "Signing in.."
                : "Signin"}
            </button>
          </form>
        )}
      ></Form>
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
