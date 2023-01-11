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

  type Query {
    getUser(token: String!): User
  }

  type Mutation {
    newUser(input: UserInput): User
    authUser(input: AuthInput): Token
  }
`;

module.exports = typeDefs;
