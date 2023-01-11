const { gql } = require("apollo-server");

// Schema
// Con gql indica que es código de graphQL
const typeDefs = gql`
  type User {
    id: ID
    name: String
    surname: String
    email: String
    createdAt: String
  }

  type Token {
    token: String
  }

  type Product {
    id: ID
    name: String
    stock: Int
    price: Float
    createdAt: String
  }

  input UserInput {
    name: String!
    surname: String!
    email: String!
    password: String!
  }

  input AuthInput {
    email: String!
    password: String!
  }

  input ProductInput {
    name: String!
    stock: Int!
    price: Float!
  }

  type Query {
    getUser(token: String!): User
  }

  type Mutation {
    # Users
    newUser(input: UserInput): User
    authUser(input: AuthInput): Token

    # Products
    newProduct(input: ProductInput): Product
  }
`;

module.exports = typeDefs;
