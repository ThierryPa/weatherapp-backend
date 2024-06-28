const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://admin:lM04lK8dfLSaOq20@cluster0.s0kvsp0.mongodb.net/weatherapp';

mongoose.set("strictQuery", true); // Remove Mongoose warning in console

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));

  module.exports = connectionString;