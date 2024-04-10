require('dotenv').config(); // Ensure environment variables are loaded
const { Sequelize, DataTypes } = require('sequelize');

// Create a new Sequelize instance using environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: console.log, // Enable logging of SQL queries
  dialectOptions: {
    // Omitted SSL configuration since it's not needed for a local database
  }
});

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = { sequelize,DataTypes};
