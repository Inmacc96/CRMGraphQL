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

  type Customer {
    id: ID
    name: String
    surname: String
    company: String
    email: String
    phone: String
    createdAt: String
    seller: ID
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

  input CustomerInput {
    name: String!
    surname: String!
    company: String!
    email: String!
    phone: String
  }

  type Query {
    # Users
    getUser(token: String!): User

    # Products
    getProducts: [Product]
    getProduct(id: ID!): Product

    # Customers
    getCustomers: [Customer]
    getCustomersSeller: [Customer]
    getCustomer(id: ID!): Customer
  }

  type Mutation {
    # Users
    newUser(input: UserInput): User
    authUser(input: AuthInput): Token

    # Products
    newProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): String

    # Customers
    newCustomer(input: CustomerInput): Customer
    updateCustomer(id:ID!, input: CustomerInput): Customer
    deleteCustomer(id:ID!): String
  }
`;

module.exports = typeDefs;
