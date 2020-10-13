const userResolver = require("./user");
const productResolver = require("./product");

const resolvers = {
  Query: {
    ...productResolver.Query,
    ...userResolver.Query,
  },
  Product: {
    ...productResolver.Product,
  },
  Mutation: {
    ...userResolver.Mutation,
  },
};

module.exports = resolvers;
