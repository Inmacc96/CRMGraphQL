import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo";
import AuthState from "../context/auth/AuthState";
import OrderState from "../context/orders/OrderState";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AuthState>
        <OrderState>
          <Component {...pageProps} />
        </OrderState>
      </AuthState>
    </ApolloProvider>
  );
}

export default MyApp;
