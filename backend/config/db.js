const moongose = require("mongoose");
require("dotenv").config({ path: ".env" });

const connectDB = async () => {
  try {
    const connection = await moongose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const url = `${connection.connection.host}: ${connection.connection.port}`;
    console.log(`MongoDB connected in: ${url}`);
  } catch (err) {
    console.log("There was a error");
    console.log(err);
    process.exit(1); // Detener la app
  }
};

module.exports = connectDB;
