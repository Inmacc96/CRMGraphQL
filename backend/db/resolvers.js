const User = require("../models/User");

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

      // Guardarlo en la base de datos
      try {
        const user = new User(input);
        user.save();
        console.log(user);
        return user;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = resolvers;
