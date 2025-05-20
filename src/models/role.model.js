const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user.model");
const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notNull: { msg: "name is required" },
      },
    },
  },
  {
    timestamps: true,
  }
);

Role.hasMany(User, {
  foreignKey: "role_id",
  sourceKey: "id",
});

User.belongsTo(Role, {
  foreignKey: "role_id",
  targetKey: "id",
});

module.exports = Role;