const User = require("../models/User");
const bcryptjs = require("bcryptjs");

// Resolvers
const resolvers = {
  Query: {
    getCourse: () => {},
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

      // Crear el token
    },
  },
};

module.exports = resolvers;
