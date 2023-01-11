const User = require("../models/User");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
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
    getProduct: async (_, { id }) => {
      // Comprobar que el producto existe
      const product = await Product.findById(id);

      if (!product) {
        throw new Error("Product not found");
      }

      return product;
    },
    getCustomers: async () => {
      try {
        const customers = await Customer.find({});
        return customers;
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
    updateProduct: async (_, { id, input }) => {
      // Comrpobar que el producto existe
      let product = await Product.findById(id);

      if (!product) {
        throw new Error("Product not found");
      }

      // Guardar el nuevo valor en la base de datos
      // new: true para que me retorne el nuevo valor de product
      product = await Product.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });

      return product;
    },
    deleteProduct: async (_, { id }) => {
      // Comrpobar que el producto existe
      let product = await Product.findById(id);

      if (!product) {
        throw new Error("Product not found");
      }

      // Eliminar
      await Product.findOneAndDelete({ _id: id });
      return "Deleted product";
    },
    newCustomer: async (_, { input }, { user }) => {
      console.log(user);
      const { email } = input;
      // Verificar si el cliente ya está registrado
      const existCustomer = await Customer.findOne({ email });

      if (existCustomer) {
        throw new Error("Customer is already registered");
      }

      const newCustomer = new Customer(input);

      // Asignar el vendedor
      newCustomer.seller = user.id;

      // Guardarlo en la base de datos
      try {
        const customer = await newCustomer.save();
        return customer;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = resolvers;
