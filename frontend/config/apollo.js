import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";

// Contiene la configuracion de hacia donde nos vamos a conectar para obtener los datos
const httpLink = createHttpLink({
  uri: "http://localhost:4000/",
});

const authLink = setContext((_, { headers }) => {
  // Leer el LS
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client;
