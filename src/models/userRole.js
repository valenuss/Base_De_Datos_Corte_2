const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const Post = require("./post.model");
const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      notNull: { msg: "first name is required" },
    },
  },
  last_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      notNull: { msg: "last name is required" },
    },
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
  telephone: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      notNull: { msg: "telephone is required" },
    },
  },
  avatar: {
    type: DataTypes.STRING(150),
    defaultValue: "avatar-user.png",
  }
}, {
  timestamps: true,
  tableName: "Users"
});

// Modelo Role
const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  }
}, {
  timestamps: false,
  tableName: "Roles"
});

// Modelo intermedio UserRole
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

// Relaciones User–Post
User.hasMany(Post, {
  foreignKey: "author_id",
  sourceKey: "id",
  as: "Author",
});

Post.belongsTo(User, {
  foreignKey: "author_id",
  targetKey: "id",
  as: "Author",
});

// Relaciones User–Role (N:M)
User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "user_id",
  otherKey: "role_id",
  as: "Roles"
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "role_id",
  otherKey: "user_id",
  as: "Users"
});

module.exports = {
  User,
  Role,
  UserRole,
  Post,
};
