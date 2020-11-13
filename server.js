const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});
const PORT = process.env.PORT || 5500;
const mongo = process.env.MONGO_CONFIG;
mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongoose connected");
    return server.listen({ port: PORT });
  })
  .then(({ url }) => {
    console.log(`running on ${url}`);
  })
  .catch((err) => console.log(err));
