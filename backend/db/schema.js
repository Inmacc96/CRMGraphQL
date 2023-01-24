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

  type Order {
    id: ID
    order: [OrderProduct]
    total: Float
    customer: ID
    seller: ID
    state: StateOrder
    createdAt: String
  }

  type OrderProduct {
    id: ID
    quantity: Int
  }

  type TopCustomer {
    total: Float
    customer: [Customer]
  }

  type TopSeller {
    total: Float
    seller: [User]
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

  input OrderProductInput {
    id: ID
    quantity: Int
  }

  input OrderInput {
    order: [OrderProductInput]
    total: Float
    customer: ID!
    state: StateOrder
  }

  enum StateOrder {
    PENDING
    CANCELLED
    COMPLETED
  }

  type Query {
    # Users
    getUser: User

    # Products
    getProducts: [Product]
    getProduct(id: ID!): Product

    # Customers
    getCustomers: [Customer]
    getCustomersSeller: [Customer]
    getCustomer(id: ID!): Customer

    # Orders
    getOrders: [Order]
    getOrdersSeller: [Order]
    getOrder(id: ID!): Order
    getOrderState(state: StateOrder!): [Order]

    # Advanced searches
    getBestCustomers: [TopCustomer]
    getBestSellers: [TopSeller]
    searchProduct(text: String!): [Product]
  }

  type Mutation {
    # Users
    newUser(input: UserInput): User
    authUser(input: AuthInput): Token

    # Products
    newProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): Product

    # Customers
    newCustomer(input: CustomerInput): Customer
    updateCustomer(id: ID!, input: CustomerInput): Customer
    deleteCustomer(id: ID!): Customer

    # Orders
    newOrder(input: OrderInput): Order
    updateOrder(id: ID!, input: OrderInput): Order
    deleteOrder(id: ID!): Order
  }
`;

module.exports = typeDefs;
