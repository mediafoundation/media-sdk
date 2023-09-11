require('dotenv').config();
const {Sequelize} = require('sequelize');
const isTesting = process.env.NODE_ENV === 'test';


const sequelize = isTesting ?
  new Sequelize('sqlite::memory:', {logging: false}) :
  new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      port: process.env.DB_PORT
    }
  );

module.exports = sequelize;