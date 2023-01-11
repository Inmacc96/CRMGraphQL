const User = require("../models/User");
const Product = require("../models/Product");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const createToken = (user, secret, expiresIn) => {
  const { id, email, name, surname } = user;

  return jwt.sign({ id, email, name, surname }, secret, { expiresIn });
};

// Resolvers
const resolvers = {
  Query: {
    getUser: async (_, { token }) => {
      const userId = await jwt.verify(token, process.env.JWT_SECRET);

      return userId;
    },
    getProducts: async () => {
      try {
        const products = await Product.find({});
        return products;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    newUser: async (_, { input }) => {
      const { email, password } = input;

      // Comprobar si el usuario está registrado
      const existUser = await User.findOne({ email });

      if (existUser) {
        throw new Error("Already registered user");
      }

      // Hashear su password
      const salt = await bcryptjs.genSalt(10);
      input.password = await bcryptjs.hash(password, salt);

      // Guardarlo en la base de datos
      try {
        const user = new User(input);
        user.save();
        return user;
      } catch (err) {
        console.log(err);
      }
    },
    authUser: async (_, { input }) => {
      const { email, password } = input;

      // Comprobar que el usuario existe
      const existUser = await User.findOne({ email });
      if (!existUser) {
        throw new Error("Already registered user");
      }

      // Comprobar que el password es correcto
      const isCorrectPassword = await bcryptjs.compare(
        password,
        existUser.password
      );
      if (!isCorrectPassword) {
        throw new Error("Password is incorrect");
      }

      // Crear el token
      return {
        token: createToken(existUser, process.env.JWT_SECRET, "24h"),
      };
    },
    newProduct: async (_, { input }) => {
      try {
        const newProduct = new Product(input);
        // Almacenar en la bd
        const product = await newProduct.save();

        return product;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = resolvers;
