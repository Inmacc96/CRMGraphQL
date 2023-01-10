const { ApolloServer, gql } = require("apollo-server");

// Schema
// Con gql indica que es código de graphQL
const typeDefs = gql`
  type Course {
    title: String
    technology: String
  }

  type Query {
    getCourses: [Course]
  }
`;

const courses = [
  {
      title: 'JavaScript Moderno Guía Definitiva Construye +10 Proyectos',
      technology: 'JavaScript ES6',
  },
  {
      title: 'React – La Guía Completa: Hooks Context Redux MERN +15 Apps',
      technology: 'React',
  },
  {
      title: 'Node.js – Bootcamp Desarrollo Web inc. MVC y REST API’s',
      technology: 'Node.js'
  }, 
  {
      title: 'ReactJS Avanzado – FullStack React GraphQL y Apollo',
      technology: 'React'
  }
];

// Resolvers
const resolvers = {
  Query: {
    getCourses: () => {
      return courses
    },
  },
};


// Servidor
const server = new ApolloServer({typeDefs, resolvers});

// Arrancar el servidor
server.listen().then(({ url }) => {
  console.log(`Server ready at URL ${url}`);
});
