const { AuthenticationError } = require("apollo-server");
const User = require("../model/User");

module.exports = {
  Query: {
    getMyList: async (_, __, { loggedUser }) => {
      if (!loggedUser) {
        throw new AuthenticationError("unauthenticated", {
          error: "unauth",
        });
      }
      const user = await User.findById(loggedUser.id);
      if (user && user.myList) {
        return user.myList;
      }
    },
  },
  Mutation: {
    addToMyList: async (
      _,
      { id, name, date, rating, overview, image },
      { loggedUser }
    ) => {
      if (!loggedUser) {
        throw new AuthenticationError("unauthenticated", {
          error: "unauth",
        });
      }
      const user = await User.findById(loggedUser.id);
      if (user && user.myList) {
        const index = user.myList.findIndex((list) => list.id == id);
        if (index === -1) {
          user.myList.push({ id, name, date, rating, overview, image });
          user.save();
          return "Added to my list.";
        } else {
          return "Already exists in my list.";
        }
      }
    },
    removeFromMyList: async (_, { id }, { loggedUser }) => {
      if (!loggedUser) {
        throw new AuthenticationError("unauthenticated", {
          error: "unauth",
        });
      }
      const user = await User.findById(loggedUser.id);
      if (user && user.myList) {
        user.myList = user.myList.filter((list) => list.id !== id);
        user.save();
        return "Removed from my list";
      }
    },
  },
};
