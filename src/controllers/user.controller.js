const User = require("../models/user.model");
const Role = require("../models/role.model");
const Auth = require("../models/auth.model");
const response = require("../red/response");
const bcrypt = require("bcrypt");
const fs = require("fs");

// Obtener todos los usuarios con sus roles (N:M)
const getAll = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: { model: Role, as: "Roles" }
    });

    let data = users.length > 0
      ? { total_users: users.length, users }
      : { message: "This table has no records" };

    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
};

// Obtener un usuario por ID con sus roles
const getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({
      where: { id },
      include: { model: Role, as: "Roles" }
    });

    let data = user
      ? { user }
      : { message: "This query has no records" };

    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo usuario (y su auth si tiene email y password)
const create = async (req, res, next) => {
  try {
    const data = req.body;
    await User.sync();
    const createUser = await User.create(data);

    const message = {
      msg: "Record was created successfully",
      userID: createUser.id,
    };

    // Crear registro en Auth si se provee email y contraseña
    if (data.email && data.password) {
      await Auth.sync();
      const password = await bcrypt.hash(data.password.toString(), 5);
      const createAuth = await Auth.create({
        id: createUser.id,
        email: data.email,
        password
      });
      message.authID = createAuth.id;
    }

    response.success(req, res, message, 201);
  } catch (error) {
    next(error);
  }
};

// Actualizar un usuario
const update = async (req, res, next) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await User.update(data, { where: { id } });

    const message = {
      msg: "Record was updated successfully",
      userID: id,
    };

    response.success(req, res, message, 200);
  } catch (error) {
    next(error);
  }
};

// Eliminar un usuario
const deleted = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.destroy({ where: { id } });

    const message = {
      msg: "Record was deleted successfully",
      userID: id,
    };

    response.success(req, res, message, 200);
  } catch (error) {
    next(error);
  }
};

// Subir avatar de usuario
const uploadAvatar = async (req, res, next) => {
  const { file } = req;
  const filePath = file.path;
  const imagePath = `http://localhost:3000/images/users/avatar/${file.filename}`;

  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id } });

    // Si ya tiene avatar anterior, eliminarlo
    if (user.imagePath) {
      fs.unlink(user.imagePath, (err) => {
        if (err) console.error(err);
      });
    }

    const updateUser = await User.update({
      avatar: imagePath,
      imagePath: filePath
    }, {
      where: { id }
    });

    const message = {
      msg: "Image was modified successfully",
      user: id,
      img: imagePath,
    };

    response.success(req, res, message, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleted,
  uploadAvatar,
};