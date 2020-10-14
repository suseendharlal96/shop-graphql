const userResolver = require("./user");
const productResolver = require("./product");
const cartResolver = require("./cart");

const resolvers = {
  Query: {
    ...productResolver.Query,
    ...userResolver.Query,
    ...cartResolver.Query,
  },
  Mutation: {
    ...productResolver.Mutation,
    ...userResolver.Mutation,
    ...cartResolver.Mutation,
  },
};

module.exports = resolvers;
