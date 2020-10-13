const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");

const validate = require("../../util/validation");
const User = require("../model/User");

module.exports = {
  Query: {
    signin: async (_, { email, password }) => {
      validate.validateSignin(email, password);
      const oldUser = await User.findOne({ email });
      if (!oldUser) {
        throw new AuthenticationError("Invalid credentials", {
          error: "Invalid credentials",
        });
      }
      const token = jwt.sign(
        {
          id: oldUser._id,
          email: oldUser.email,
          password: bcrpyt.hash(password, 12),
        },
        "SECRET_SHOP",
        { expiresIn: "1h" }
      );
      return { ...oldUser._doc, id: oldUser.id, token };
    },
  },
  Mutation: {
    signup: async (_, { email, password, confirmPassword }) => {
      validate.validateSignup(email, password, confirmPassword);
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        throw new AuthenticationError("User already exists", {
          error: "User already exists",
        });
      }
      const user = await User.create({
        email,
        password,
      });
      console.log("user", user);
      console.log("user", user._doc);
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          password: bcrpyt.hash(password, 12),
        },
        "SECRET_SHOP",
        { expiresIn: "1h" }
      );
      return { ...user._doc, id: user.id, token };
    },
  },
};
