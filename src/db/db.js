const { Sequelize } = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(
  config.mysql.database,
  config.mysql.user,
  config.mysql.password,
  {
    host: config.mysql.host,
    dialect: "mysql",
    port: config.mysql.host,
  }
);

/*Prueba de coneccion*/
// async function testConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log("all good");
//   } catch (error) {
//     console.error("all bad");
//   }
// }

// testConnection();

module.exports = sequelize;
