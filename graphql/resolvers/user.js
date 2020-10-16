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
        throw new AuthenticationError("User doesn't exist.Try creating one.", {
          error: "User doesn't exist.Try creating one.",
        });
      }
      console.log(oldUser)
      const isPassMatch = await bcrpyt.compare(password, oldUser.password);
      if (!isPassMatch) {
        throw new AuthenticationError("Invalid credentials", {
          error: "Invalid credentials",
        });
      }
      // console.log(oldUser)
      const token = jwt.sign(
        {
          id: oldUser._id,
          email: oldUser.email,
          password: oldUser.password,
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
      const hashPass = await bcrpyt.hash(password, 12);
      const user = await User.create({
        email,
        password: hashPass,
      });
      console.log("user", user);
      console.log("user", user._doc);
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          password: user.password,
        },
        "SECRET_SHOP",
        { expiresIn: "1h" }
      );
      return { ...user._doc, id: user.id, token };
    },
  },
};
