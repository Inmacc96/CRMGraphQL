const courses = [
  {
    title: "JavaScript Moderno Guía Definitiva Construye +10 Proyectos",
    technology: "JavaScript ES6",
  },
  {
    title: "React – La Guía Completa: Hooks Context Redux MERN +15 Apps",
    technology: "React",
  },
  {
    title: "Node.js – Bootcamp Desarrollo Web inc. MVC y REST API’s",
    technology: "Node.js",
  },
  {
    title: "ReactJS Avanzado – FullStack React GraphQL y Apollo",
    technology: "React",
  },
];

// Resolvers
const resolvers = {
  Query: {
    // ctx es un context, informacion compartida de todos los resolvers. Se puede guardar informacion como que el usuario está autenticado
    // info, informacion de la consulta(avanzado)
    getCourses: (_, { input }, ctx, info) => {
      console.log(ctx);
      const result = courses.filter(
        (course) => course.technology === input.technology
      );

      return result;
    },
  },
};

module.exports = resolvers;
