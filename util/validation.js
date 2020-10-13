const { AuthenticationError } = require("apollo-server");

module.exports = {
  validateSignup: (email, password, confirmPassword) => {
    if (email === "" || password === "" || confirmPassword === "") {
      if (email === "") {
        throw new AuthenticationError("email is required", {
          email: "Required",
        });
      } else {
        const regEx = /^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
          throw new AuthenticationError("invalid email", {
            email: "Invalid Email",
          });
        }
      }
      if (password === "") {
        throw new AuthenticationError("password is required", {
          password: "Required",
        });
      }
      if (confirmPassword === "") {
        throw new AuthenticationError("confirmPassword is required", {
          confirmPassword: "Required",
        });
      }
    } else if (password !== confirmPassword) {
      throw new AuthenticationError("Password mismatch", {
        confirmPassword: "Password mismatch",
      });
    }
  },
  validateSignin: (email, password) => {
    if (email === "" || password === "") {
      if (email === "") {
        throw new AuthenticationError("email is required", {
          email: "Required",
        });
      } else {
        const regEx = /^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
          throw new AuthenticationError("invalid email", {
            email: "Invalid Email",
          });
        }
      }
      if (password === "") {
        throw new AuthenticationError("password is required", {
          password: "Required",
        });
      }
    }
  },
};
