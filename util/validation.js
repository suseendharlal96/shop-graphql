const { UserInputError } = require("apollo-server");

module.exports = {
  validateSignup: (email, password, confirmPassword) => {
    if (email === "" || password === "" || confirmPassword === "") {
      if (email === "") {
        throw new UserInputError("email is required", {
          errors: {
            email: "Required",
          },
        });
      } else {
        const regEx = /^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
          throw new UserInputError("invalid email", {
            errors: {
              email: "Invalid Email.",
            },
          });
        }
      }
      if (password === "") {
        throw new UserInputError("password is required", {
          errors: {
            password: "Required.",
          },
        });
      }
      if (confirmPassword === "") {
        throw new UserInputError("confirmPassword is required", {
          errors: {
            confirmPassword: "Required.",
          },
        });
      }
    } else if (password !== confirmPassword) {
      throw new UserInputError("Password mismatch", {
        errors: {
          confirmPassword: "Password mismatch",
        },
      });
    }
  },
  validateSignin: (email, password) => {
    if (email === "" || password === "") {
      if (email === "") {
        throw new UserInputError("email is required", {
          errors: {
            email: "Required.",
          },
        });
      } else {
        const regEx = /^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
          throw new UserInputError("invalid email", {
            errors: {
              email: "Invalid Email.",
            },
          });
        }
      }
      if (password === "") {
        throw new UserInputError("password is required", {
          errors: {
            password: "Required.",
          },
        });
      }
    }
  },
};
