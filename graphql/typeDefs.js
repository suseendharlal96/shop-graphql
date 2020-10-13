const { gql } = require("apollo-server");

const typeDefs = gql`
  type Product {
    id: String!
    name: String!
    owner: Owner!
  }

  type User {
    email: String!
    token: String!
    id: ID!
  }

  type Owner {
    name: String!
  }

  type Query {
    getProducts: [Product!]!
    signin(email: String!, password: String!): User!
  }

  type Mutation {
    signup(email: String!, password: String!, confirmPassword: String!): User!
  }
`;

module.exports = typeDefs;
