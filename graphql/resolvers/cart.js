const { AuthenticationError } = require("apollo-server");

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
      const cart = await Cart.find({ userId: loggedUser.id });
      console.log(cart);
      console.log(cart.products);
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
        await Cart.create({
          userId: user,
          products: product,
        });
      }
      return "Added to cart";
    },
  },
};
