const { AuthenticationError, UserInputError } = require("apollo-server");

const Cart = require("../model/Cart");
const Product = require("../model/Product");
const User = require("../model/User");
const auth = require("../../util/auth");

module.exports = {
  Query: {
    getCart: async (_, __, context) => {
      const loggedUser = auth(context);
      if (!loggedUser) {
        throw new AuthenticationError("unauthenticated", {
          error: "unauth",
        });
      }
      try {
        const cart = await Cart.findOne({ userId: loggedUser.id });
        return cart ? cart : null;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    addToCart: async (_, { prodId }, context) => {
      const loggedUser = auth(context);
      if (!loggedUser) {
        throw new AuthenticationError("unauthenticated", {
          error: "unauth",
        });
      }
      try {
        const user = await User.findById(loggedUser.id);
        const product = await Product.findById(prodId);
        const cart = await Cart.findOne({ userId: loggedUser.id });
        if (cart) {
          const existingProductIndex = cart.products.findIndex(
            (c) => c._id == prodId
          );
          if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity++;
          } else {
            cart.products.push(product);
          }
          cart.save();
        } else {
          const newCart = await Cart.create({
            userId: user,
            products: [],
          });
          newCart.products.push(product);
          newCart.save();
        }
        return "Added to cart";
      } catch (err) {
        console.log(err);
      }
    },
    removeFromCart: async (_, { prodId }, context) => {
      const loggedUser = auth(context);
      if (!loggedUser) {
        throw new AuthenticationError("unauthenticated", {
          error: "unauth",
        });
      }
      try {
        const product = await Product.findById(prodId);
        const cart = await Cart.findOne({ userId: loggedUser.id });
        if (cart) {
          const cIndex = cart.products.findIndex((p) => p._id === prodId);
          if (cIndex !== -1) {
            cart.products.splice(cIndex, 1);
            cart.save();
            return "item removed from cart";
          }
        } else {
          throw new UserInputError("Not found", {
            errors: "Product not found",
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
