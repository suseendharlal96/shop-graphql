const { AuthenticationError } = require("apollo-server");
const User = require("../model/User");

module.exports = {
  Mutation: {
    addToMyList: async (
      _,
      { id, name, date, rating, overview },
      { loggedUser }
    ) => {
      if (!loggedUser) {
        throw new AuthenticationError("unauthenticated", {
          error: "unauth",
        });
      }
      const user = await User.findById(loggedUser.id);
      if (user && user.myList) {
        user.myList.push({ id, name, date, rating, overview });
        user.save();
        return "Added to my list";
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
