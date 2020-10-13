const userResolver = require("./user");
const productResolver = require("./product");

const resolvers = {
  Query: {
    ...productResolver.Query,
    ...userResolver.Query,
  },
  Mutation: {
    ...productResolver.Mutation,
    ...userResolver.Mutation,
  },
};

module.exports = resolvers;
