const { gql } = require("apollo-server");

// Schema
// Con gql indica que es código de graphQL
const typeDefs = gql`
  type Course {
    title: String
  }

  type Technology {
    technology: String
  }

  input CourseInput {
    technology: String
  }

  type Query {
    getCourses(input: CourseInput!): [Course]
    getTechnology: [Technology]
  }
`;

module.exports = typeDefs;
