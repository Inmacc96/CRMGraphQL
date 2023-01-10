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

  input UserInput {
    name: String!
    surname: String!
    email: String!
    password: String!
  }

  type Query {
    getCourse: String
  }

  type Mutation {
    newUser(input: UserInput): User
  }
`;

module.exports = typeDefs;
