const User = require("../models/User");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const Order = require("../models/Order");
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
    getCustomersSeller: async (_, {}, { user }) => {
      try {
        const customers = await Customer.find({ seller: user.id.toString() });
        return customers;
      } catch (err) {
        console.log(err);
      }
    },
    getCustomer: async (_, { id }, { user }) => {
      // Comprobar que existe el cliente
      const customer = await Customer.findById({ _id: id });

      if (!customer) {
        throw new Error("Customer not found");
      }

      // Quien lo creó puede verlo
      if (user.id !== customer.seller.toString()) {
        throw new Error("You do not have permission to get this customer");
      }

      return customer;
    },
    getOrders: async () => {
      try {
        const orders = await Order.find({});
        return orders;
      } catch (err) {
        console.log(err);
      }
    },
    getOrdersSeller: async (_, {}, { user }) => {
      try {
        const orders = await Order.find({seller: user.id})
        return orders;
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
    updateCustomer: async (_, { id, input }, { user }) => {
      // Comprobar que el cliente existe
      let customer = await Customer.findById(id);
      if (!customer) {
        throw new Error("Customer not found");
      }
      // Comprobar que el vendedor es quien lo edita
      if (user.id !== customer.seller.toString()) {
        throw new Error("You do not have permission to edit this customer");
      }

      // Guardar el nuevo valor en la base de datos
      customer = await Customer.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });
      return customer;
    },
    deleteCustomer: async (_, { id }, { user }) => {
      // Comprobar que el cliente existe
      let customer = await Customer.findById(id);
      if (!customer) {
        throw new Error("Customer not found");
      }

      // Comprobar que el vendedor es quien lo borra
      if (user.id !== customer.seller.toString()) {
        throw new Error("You do not have permission to delete this customer");
      }

      // Borrar el cliente de la base de datos
      await Customer.findOneAndDelete({ _id: id });
      return "Deleted customer";
    },
    newOrder: async (_, { input }, { user }) => {
      const { customer: customerID, order } = input;
      // Verificar si el cliente existe
      const customer = await Customer.findById(customerID);

      if (!customer) {
        throw new Error("Customer not found");
      }

      // Verificar si el cliente es del vendedor
      if (customer.seller.toString() !== user.id) {
        throw new Error("You do not have permission to create this order");
      }

      // Comprobar que el stock esté disponible
      for await (const item of order) {
        const { id } = item;

        const product = await Product.findById(id);

        if (item.quantity > product.stock) {
          throw new Error(
            `The ${product.name} item exceeds the quantity available`
          );
        } else {
          // Restar la cantidad a lo disponible
          product.stock = product.stock - item.quantity;
          await product.save();
        }
      }

      // Crear un nuevo pedido
      const newOrder = new Order(input);

      // Asignarle un vendedor
      newOrder.seller = user.id;

      // Guardarlo en la base de datos
      return await newOrder.save();
    },
  },
};

module.exports = resolvers;
