const { AuthenticationError } = require("apollo-server");

const User = require("../model/User");
const Order = require("../model/Order");
const Cart = require("../model/Cart");

module.exports = {
  Query: {
    getOrders: async (_, __, { loggedUser }) => {
      if (!loggedUser) {
        throw new AuthenticationError("unauthenticated", {
          error: "unauth",
        });
      }
      try {
        const order = await Order.findOne({ userId: loggedUser.id });
        return order ? order : null;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    pay: async (_, { product }, { loggedUser }) => {
      console.log("order", product);
      if (!loggedUser) {
        throw new AuthenticationError("unauthenticated", {
          error: "unauth",
        });
      }
      try {
        const user = await User.findById(loggedUser.id);
        const order = await Order.findOne({ userId: loggedUser.id });
        const cart = await Cart.findOne({ userId: loggedUser.id });
        if (order) {
          console.log("old");
          order.products.push({ ...product, date: new Date().toISOString() });
          order.save();
          const cIndex = cart.products.findIndex((c) => c._id === product.id);
          cart.products.splice(cIndex, 1);
          cart.save();
          return "payment successfull";
        } else {
          console.log("new");
          const newOrder = await Order.create({
            userId: user,
            products: [],
          });
          newOrder.products.push({
            ...product,
            date: new Date().toISOString(),
          });
          newOrder.save();
          const cIndex = cart.products.findIndex((c) => c._id === product.id);
          cart.products.splice(cIndex, 1);
          cart.save();
          return "payment successfull";
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
