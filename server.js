const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");
const auth = require("./util/auth");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: auth,
});
const PORT = process.env.port || 5000;
const mongo = process.env.MONGO_CONFIG;
mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongoose connected");
    return server.listen({ port: PORT });
  })
  .then(({ url }) => {
    console.log(`running on ${url}`);
  });
