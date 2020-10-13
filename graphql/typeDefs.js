const { gql } = require("apollo-server");

const typeDefs = gql`
  type Product {
    id: String!
    name: String!
    price: Int!
    image: String!
    description: String!
    creator: ID!
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

    addProduct(
      name: String!
      price: Int!
      image: String!
      description: String!
    ): Product!

    updateProduct(
      id: ID!
      name: String!
      price: Int!
      image: String!
      description: String!
    ): Product!

    deleteProduct(id: ID!): String!
  }
`;

module.exports = typeDefs;
