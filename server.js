const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");
const auth = require("./util/auth");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: auth,
});

const PORT = process.env.port || 5000;

mongoose
  .connect(
    "mongodb+srv://suseendhar:susee123@cluster0.iwva7.mongodb.net/shop-graphql?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("mongoose connected");
    return server.listen({ port: PORT });
  })
  .then(({ url }) => {
    console.log(`running on ${url}`);
  });
