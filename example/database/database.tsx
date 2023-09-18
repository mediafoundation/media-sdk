const env = require('../../config/env')
const {Sequelize} = require('sequelize');
const isTesting = env.debug === 'test';

console.log(isTesting, env.debug)


export const sequelize = new Sequelize(env.DB_NAME, env.DB_USERNAME, env.DB_PASSWORD, {
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: env.DB_DIALECT,
  logging: false
})