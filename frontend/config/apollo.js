import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";

const uri = process.env.NEXT_PUBLIC_BACKEND_URI;

if (!uri) {
  throw new Error("GRAPHQL_URI is not defined in the environment variables.");
}

// Contiene la configuracion de hacia donde nos vamos a conectar para obtener los datos
const httpLink = createHttpLink({ uri });

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
  cache: new InMemoryCache({
    typePolicies: {
      OrderProduct: { keyFields: ["id", "quantity"] },
    },
  }),
  link: authLink.concat(httpLink),
});

export default client;
