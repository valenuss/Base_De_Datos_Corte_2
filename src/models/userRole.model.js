const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const UserRole = sequelize.define("UserRole", {
  user_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: "Users",
      key: "id",
    },
  },
  role_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: "Roles",
      key: "id",
    },
  },
}, {
  timestamps: false,
  tableName: "UserRole",
});


module.exports = {
  UserRole,
};
