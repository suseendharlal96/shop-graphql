const { gql } = require("apollo-server");

const typeDefs = gql`
  type ProductData {
    products: [Product]!
    paginationInfo: Pagination!
  }

  type Product {
    _id: String!
    name: String!
    price: Int!
    image: String!
    description: String!
    creator: ID!
    quantity: Int
  }

  type Pagination {
    prevPage: Int
    nextPage: Int
    totalPages: Int!
  }

  type User {
    email: String!
    token: String!
    id: ID!
  }

  type Owner {
    name: String!
  }

  type Cart {
    _id: ID!
    userId: ID
    products: [Product]
  }

  input ProductInput {
    id: ID!
    name: String!
    price: Int!
    image: String!
    description: String!
    quantity: Int!
  }

  type Query {
    getProducts(page: Int!, limit: Int!): ProductData!
    signin(email: String!, password: String!): User!
    getCart: Cart
    getOrders: Cart
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

    addToCart(prodId: ID!): String!

    removeFromCart(prodId: ID!): String!

    pay(product: ProductInput!): String!
  }
`;

module.exports = typeDefs;
