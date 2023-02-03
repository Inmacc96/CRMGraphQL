import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./db/schema.js";
import resolvers from "./db/resolvers.js";
import connectDB from "./config/db.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config({ path: "env" });

// Conectar a la base de datos
connectDB();

// Servidor
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Arrancar el servidor
const { url } = await startStandaloneServer(server, {
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
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at ${url}`);
