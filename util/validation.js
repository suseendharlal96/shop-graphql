const { UserInputError } = require("apollo-server");

module.exports = {
  validateSignup: (email, password, confirmPassword) => {
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      if (email.trim() === "") {
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
      if (password.trim() === "") {
        throw new UserInputError("password is required", {
          errors: {
            password: "Required.",
          },
        });
      }
      if (confirmPassword.trim() === "") {
        throw new UserInputError("confirmPassword is required", {
          errors: {
            confirmPassword: "Required.",
          },
        });
      }
    } else if (password.trim() !== confirmPassword.trim()) {
      throw new UserInputError("Password mismatch", {
        errors: {
          confirmPassword: "Password mismatch",
        },
      });
    }
  },
  validateSignin: (email, password) => {
    if (email.trim() === "" || password.trim() === "") {
      if (email.trim() === "") {
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
      if (password.trim() === "") {
        throw new UserInputError("password is required", {
          errors: {
            password: "Required.",
          },
        });
      }
    }
  },
};
