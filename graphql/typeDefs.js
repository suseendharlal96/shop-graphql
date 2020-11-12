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
    myList: [MyList]
  }

  type MyList {
    id: Int
    name: String
    date: String
    rating: Float
    overview: String
    image: String
  }

  type Owner {
    name: String!
  }

  type Cart {
    _id: ID!
    userId: ID
    products: [Product]
  }

  type Order {
    _id: String!
    name: String!
    price: Int!
    image: String!
    description: String!
    quantity: Int!
    date: String!
  }

  type OrderType {
    _id: ID!
    userId: ID
    products: [Order]
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
    getOrders: OrderType
    getMyList: [MyList]!
  }

  type Mutation {
    # for vue-apollo 
    signin(email: String!, password: String!): User! 
    
    signup(email: String!, password: String!, confirmPassword: String!): User!

    # for vue-apollo 
    getProducts(page: Int!, limit: Int!): ProductData!
    
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

    addToMyList(
      id: Int!
      name: String!
      date: String!
      rating: Float!
      overview: String!
      image: String!
    ): String!

    removeFromMyList(id: Int!): String!
  }
`;

module.exports = typeDefs;
