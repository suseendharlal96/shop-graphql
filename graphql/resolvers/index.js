const userResolver = require("./user");
const productResolver = require("./product");
const cartResolver = require("./cart");
const orderResolver = require("./order");
const movieResolver = require("./movie");

const resolvers = {
  Query: {
    ...productResolver.Query,
    ...userResolver.Query,
    ...cartResolver.Query,
    ...orderResolver.Query,
    ...movieResolver.Query,
  },
  Mutation: {
    ...productResolver.Mutation,
    ...userResolver.Mutation,
    ...cartResolver.Mutation,
    ...orderResolver.Mutation,
    ...movieResolver.Mutation,
  },
};

module.exports = resolvers;
