const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Auth = sequelize.define(
  "Auth",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: { msg: "email is required" },
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: { msg: "password is required" },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Auth;
