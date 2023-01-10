const { ApolloServer, gql } = require("apollo-server");

// Servidor
const server = new ApolloServer();

// Arrancar el servidor
server.listen().then(({ url }) => {
  console.log(`Server ready at URL ${url}`);
});
