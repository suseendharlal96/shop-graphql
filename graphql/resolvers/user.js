const { UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const validate = require("../../util/validation");
const User = require("../model/User");

module.exports = {
  Query: {
    signin: async (_, { email, password }) => {
      validate.validateSignin(email, password);
      try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
          throw new UserInputError("User doesn't exist.Try creating one.", {
            errors: {
              error: "User doesn't exist.Try creating one.",
            },
          });
        }
        const isPassMatch = await bcrpyt.compare(password, oldUser.password);
        if (!isPassMatch) {
          throw new UserInputError("Invalid credentials", {
            errors: { error: "Invalid credentials" },
          });
        }
        const token = jwt.sign(
          {
            id: oldUser._id,
            email: oldUser.email,
            password: oldUser.password,
          },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );
        return { ...oldUser._doc, id: oldUser.id, token };
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    signin: async (_, { email, password }) => {
      validate.validateSignin(email, password);
      try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
          throw new UserInputError("User doesn't exist.Try creating one.", {
            errors: {
              error: "User doesn't exist.Try creating one.",
            },
          });
        }
        const isPassMatch = await bcrpyt.compare(password, oldUser.password);
        if (!isPassMatch) {
          throw new UserInputError("Invalid credentials", {
            errors: { error: "Invalid credentials" },
          });
        }
        const token = jwt.sign(
          {
            id: oldUser._id,
            email: oldUser.email,
            password: oldUser.password,
          },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );
        return { ...oldUser._doc, id: oldUser.id, token };
      } catch (err) {
        console.log(err);
      }
    },
    signup: async (_, { email, password, confirmPassword }) => {
      validate.validateSignup(email, password, confirmPassword);
      try {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
          throw new UserInputError("User already exists", {
            errors: { error: "User already exists" },
          });
        }
        const hashPass = await bcrpyt.hash(password, 12);
        const user = await User.create({
          email,
          password: hashPass,
          myList: [],
        });
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
            password: user.password,
          },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );
        return { ...user._doc, id: user.id, token };
      } catch (err) {
        console.log(err);
      }
    },
  },
};
