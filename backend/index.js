const { ApolloServer } = require("apollo-server");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");

// Servidor
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    const myContext = "Hola";
    return {
      myContext,
    };
  },
});

// Arrancar el servidor
server.listen().then(({ url }) => {
  console.log(`Server ready at URL ${url}`);
});
