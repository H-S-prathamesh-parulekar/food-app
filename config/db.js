const mongoose = require("mongoose");
const colors = require("colors");
//create database connection for mongoose

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to Database ${mongoose.connection.host}`.bgMagenta);
  } catch (error) {
    console.log("DB ERROR", error);
  }
};

module.exports = connectDb;
