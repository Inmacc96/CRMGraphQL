import { ApolloServer } from "apollo-server";
import typeDefs from "./db/schema";
import resolvers from "./db/resolvers";
import connectDB from "./config/db";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config({ path: "env" });

// Conectar a la base de datos
connectDB();

// Servidor
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // console.log(req.headers["authorization"]);

    const token = req.headers["authorization"] || "";
    if (token) {
      try {
        const user = jwt.verify(
          token.replace("Bearer ", ""),
          process.env.JWT_SECRET
        );
        return { user };
      } catch (err) {
        console.log("There was a error");
        console.log(err);
      }
    }
  },
});

// Arrancar el servidor
server.listen().then(({ url }) => {
  console.log(`Server ready at URL ${url}`);
});
