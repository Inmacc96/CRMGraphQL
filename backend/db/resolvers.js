// Resolvers
const resolvers = {
  Query: {
    getCourse: () => {},
  },
  Mutation: {
    newUser: (_, { input }) => {
      console.log(input);

      return "Creating...";
    },
  },
};

module.exports = resolvers;
