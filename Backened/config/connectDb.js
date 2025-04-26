const mongoose = require('mongoose');
const colors = require('colors');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected on ${mongoose.connection.host}`.bgCyan.bold);
  } catch (err) {
    console.log(`${err}`.bgRed);
  }
};

module.exports = connectDb;
