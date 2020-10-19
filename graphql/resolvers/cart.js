const { AuthenticationError, UserInputError } = require("apollo-server");

const Cart = require("../model/Cart");
const Product = require("../model/Product");
const User = require("../model/User");

module.exports = {
  Query: {
    getCart: async (_, __, { loggedUser }) => {
      if (!loggedUser) {
        throw new AuthenticationError("unauthenticated", {
          error: "unauth",
        });
      }
      const cart = await Cart.findOne({ userId: loggedUser.id });
      console.log(cart);
      return cart ? cart : null;
    },
  },
  Mutation: {
    addToCart: async (_, { prodId }, { loggedUser }) => {
      if (!loggedUser) {
        throw new AuthenticationError("unauthenticated", {
          error: "unauth",
        });
      }
      const user = await User.findById(loggedUser.id);
      const product = await Product.findById(prodId);
      console.log("p", product);
      const cart = await Cart.findOne({ userId: loggedUser.id });
      if (cart) {
        console.log("old");
        console.log(cart.products);
        const existingProductIndex = cart.products.findIndex(
          (c) => c._id == prodId
        );
        console.log(existingProductIndex);
        if (existingProductIndex !== -1) {
          cart.products[existingProductIndex].quantity++;
        } else {
          cart.products.push(product);
        }
        cart.save();
      } else {
        console.log(product);
        console.log("new");
        const newCart = await Cart.create({
          userId: user,
          products: [],
        });
        newCart.products.push(product);
        newCart.save();
        console.log(newCart);
      }
      return "Added to cart";
    },
    removeFromCart: async (_, { prodId }, { loggedUser }) => {
      if (!loggedUser) {
        throw new AuthenticationError("unauthenticated", {
          error: "unauth",
        });
      }
      const product = await Product.findById(prodId);
      console.log("p", product);
      const cart = await Cart.findOne({ userId: loggedUser.id });
      if (cart) {
        const cIndex = cart.products.findIndex((p) => p._id === prodId);
        if (cIndex !== -1) {
          cart.products.splice(cIndex, 1);
          cart.save();
          return "item removed from cart";
        }
      } else {
        throw new UserInputError("Not found", { errors: "Product not found" });
      }
    },
  },
};
