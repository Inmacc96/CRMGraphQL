const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false); // true: Solamente los campos que se definan en el esquema serán guardados en la bd. Por defecto false
    const connection = await mongoose.connect(process.env.MONGO_URI, {
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
