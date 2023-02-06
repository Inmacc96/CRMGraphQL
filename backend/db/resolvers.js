import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { GraphQLError } from "graphql";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Customer from "../models/Customer.js";
import Order from "../models/Order.js";

dotenv.config({ path: ".env" });

const createToken = (user, secret, expiresIn) => {
  const { id, email, name, surname } = user;

  return jwt.sign({ id, email, name, surname }, secret, { expiresIn });
};

// Resolvers
const resolvers = {
  Query: {
    getUser: async (_, {}, { user }) => {
      // Comprobar que el usuario está autenticado
      if (!user) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      return user;
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
        throw new GraphQLError("Product not found", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
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
      // Comprobar que el usuario está autenticado
      if (!user) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      try {
        const customers = await Customer.find({ seller: user.id.toString() });
        return customers;
      } catch (err) {
        console.log(err);
      }
    },
    getCustomer: async (_, { id }, { user }) => {
      // Comprobar que el usuario está autenticado
      if (!user) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      // Comprobar que existe el cliente
      const customer = await Customer.findById({ _id: id });

      if (!customer) {
        throw new GraphQLError("Customer not found", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      // Quien lo creó puede verlo
      if (user.id !== customer.seller.toString()) {
        throw new GraphQLError(
          "You do not have permission to get this customer",
          {
            extensions: {
              code: "FORBIDDEN",
            },
          }
        );
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
      // Comprobar que el usuario está autenticado
      if (!user) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      try {
        const orders = await Order.find({ seller: user.id }).populate(
          "customer"
        );
        return orders;
      } catch (err) {
        console.log(err);
      }
    },
    getOrder: async (_, { id }, { user }) => {
      // Comprobar que el usuario está autenticado
      if (!user) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      // Comprobar que el pedido exista
      const order = await Order.findById(id);
      if (!order) {
        throw new GraphQLError("Order not found", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      // Comprobar que el pedido es creado por el usuario autenticado
      if (order.seller.toString() !== user.id) {
        throw new GraphQLError("You do not have permission to get this order", {
          extensions: {
            code: "FORBIDDEN",
          },
        });
      }

      return order;
    },
    getOrderState: async (_, { state }, { user }) => {
      // Comprobar que el usuario está autenticado
      if (!user) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      try {
        const orders = await Order.find({ state, seller: user.id });
        return orders;
      } catch (err) {
        console.log(err);
      }
    },
    getBestCustomers: async () => {
      const customers = await Order.aggregate([
        { $match: { state: "COMPLETED" } }, // filtra los pedidos con estado completado
        {
          $group: {
            _id: "$customer",
            total: { $sum: "$total" },
          },
        },
        {
          // lookup es un join de sql
          $lookup: {
            from: "customers",
            localField: "_id",
            foreignField: "_id",
            as: "customer",
          },
        },
        { $limit: 10 },
        {
          $sort: { total: -1 },
        },
      ]);

      return customers;
    },
    getBestSellers: async () => {
      const sellers = await Order.aggregate([
        {
          $match: { state: "COMPLETED" },
        },
        {
          $group: {
            _id: "$seller",
            total: { $sum: "$total" },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "seller",
          },
        },
        {
          $limit: 3,
        },
        { $sort: { total: -1 } },
      ]);

      return sellers;
    },
    searchProduct: async (_, { text }) => {
      try {
        const products = await Product.find({ $text: { $search: text } }).limit(
          10
        );

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
        throw new GraphQLError("Already registered user", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
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

      // Comprobar que el password es correcto
      const isCorrectPassword = await bcryptjs.compare(
        password,
        existUser.password
      );
      if (!existUser || !isCorrectPassword) {
        throw new GraphQLError("Wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
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
        throw new GraphQLError("Product not found", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
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
        throw new GraphQLError("Product not found", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      // Eliminar
      const deletedProduct = await Product.findOneAndDelete({ _id: id });
      return deletedProduct;
    },
    newCustomer: async (_, { input }, { user }) => {
      // Comprobar que el usuario está autenticado
      if (!user) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      const { email } = input;
      // Verificar si el cliente ya está registrado
      const existCustomer = await Customer.findOne({ email });

      if (existCustomer) {
        throw new GraphQLError("Customer is already registered", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
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
      // Comprobar que el usuario está autenticado
      if (!user) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      // Comprobar que el cliente existe
      let customer = await Customer.findById(id);
      if (!customer) {
        throw new GraphQLError("Customer not found", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      // Comprobar que el vendedor es quien lo edita
      if (user.id !== customer.seller.toString()) {
        throw new GraphQLError(
          "You do not have permission to edit this customer",
          {
            extensions: {
              code: "FORBIDDEN",
            },
          }
        );
      }

      // Guardar el nuevo valor en la base de datos
      customer = await Customer.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });
      return customer;
    },
    deleteCustomer: async (_, { id }, { user }) => {
      // Comprobar que el usuario está autenticado
      if (!user) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      // Comprobar que el cliente existe
      let customer = await Customer.findById(id);
      if (!customer) {
        throw new GraphQLError("Customer not found", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      // Comprobar que el vendedor es quien lo borra
      if (user.id !== customer.seller.toString()) {
        throw new GraphQLError(
          "You do not have permission to delete this customer",
          {
            extensions: {
              code: "FORBIDDEN",
            },
          }
        );
      }

      // Borrar el cliente de la base de datos
      const deletedCustomer = await Customer.findOneAndDelete({ _id: id });
      return deletedCustomer;
    },
    newOrder: async (_, { input }, { user }) => {
      // Comprobar que el usuario está autenticado
      if (!user) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      const { customer: customerID, order } = input;
      // Verificar si el cliente existe
      const customer = await Customer.findById(customerID);

      if (!customer) {
        throw new GraphQLError("Customer not found", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      // Verificar si el cliente es del vendedor
      if (customer.seller.toString() !== user.id) {
        throw new GraphQLError(
          "You do not have permission to create this order",
          {
            extensions: {
              code: "FORBIDDEN",
            },
          }
        );
      }

      // Comprobar que el stock esté disponible
      for await (const item of order) {
        const { id } = item;

        const product = await Product.findById(id);

        if (item.quantity > product.stock) {
          throw new GraphQLError(
            `The ${product.name} item exceeds the quantity available`,
            {
              extensions: {
                code: "BAD_USER_INPUT",
              },
            }
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
      const newSavedOrder = await newOrder.save();

      return await newSavedOrder.populate("customer");
    },
    updateOrder: async (_, { id, input }, { user }) => {
      // Comprobar que el usuario está autenticado
      if (!user) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      const { customer: customerID, order } = input;
      // Si el pedido existe
      const existOrder = await Order.findById(id);
      if (!existOrder) {
        throw new GraphQLError("Order not found", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      //Si el cliente existe
      const customer = await Customer.findById(customerID);
      if (!customer) {
        throw new GraphQLError("Customer not found", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      // Si el cliente y el pedido pertenece al vendedor
      if (
        existOrder.seller.toString() !== user.id ||
        customer.seller.toString() !== user.id
      ) {
        throw new GraphQLError(
          "You do not have permission to edit this order",
          {
            extensions: {
              code: "FORBIDDEN",
            },
          }
        );
      }

      // Revisar el stock
      if (order) {
        for await (const item of order) {
          const { id } = item;
          const product = await Product.findById(id);

          if (item.quantity > product.stock) {
            throw new GraphQLError(
              `The ${product.name} item exceeds the quantity available`,
              {
                extensions: {
                  code: "BAD_USER_INPUT",
                },
              }
            );
          } else {
            // Restar la cantidad a lo disponible
            product.stock = product.stock - item.quantity;
            await product.save();
          }
        }
      }

      // Guardar el pedido
      return await Order.findByIdAndUpdate({ _id: id }, input, { new: true });
    },
    deleteOrder: async (_, { id }, { user }) => {
      // Comprobar que el usuario está autenticado
      if (!user) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      // Comprobar que el pedido existe
      const order = await Order.findById(id);
      if (!order) {
        throw new GraphQLError("Order not found", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      // Comprobar que el vendedor es quien lo borra
      if (user.id !== order.seller.toString()) {
        throw new GraphQLError(
          "You do not have permission to delete this order",
          {
            extensions: {
              code: "FORBIDDEN",
            },
          }
        );
      }

      // Actualizar el stock de los productos
      if (order.order) {
        for await (const item of order.order) {
          const { id } = item;
          const product = await Product.findById(id);

          // Sumar la cantidad de los productos a lo ya disponible
          product.stock = product.stock + item.quantity;
          await product.save();
        }
      }

      // Borrar el cliente de la base de datos
      const deletedOrder = await Order.findOneAndDelete({ _id: id });
      return deletedOrder;
    },
  },
};

export default resolvers;
