const User = require("../models/user.model");
const Role = require("../models/role.model");
const Auth = require("../models/auth.model");
const response = require("../red/response");
const bcrypt = require("bcrypt");
const fs = require("fs");
const getAll = async (req, res, next) => {
  try {
    const users = await User.findAll({ include: { model: Role, as: "Role" } });
    let data = "";
    if (users.length > 0) {
      data = {
        total_users: users.length,
        users: users,
      };
    } else {
      data = {
        message: "This table has no records",
      };
    }
    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({
      where: { id },
      include: { model: Role, as: "Role" },
    });
    let data = "";
    if (user) {
      data = {
        user: user,
      };
    } else {
      data = {
        message: "This query has no records",
      };
    }
    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    await User.sync();
    const createUser = await User.create(data);
    message = {
      msg: "Record was created successfully",
      userID: createUser.id,
    };
    let createAuth = "";
    if (data.email && data.password) {
      await Auth.sync();
      password = await bcrypt.hash(data.password.toString(), 5);
      createAuth = await Auth.create({
        id: createUser.id,
        email: data.email,
        password: password,
      });
      message.authID = createAuth.id;
    }

    response.success(req, res, message, 201);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const data = req.body;
    const id = req.params.id;
    const updateUser = await User.update(data, {
      where: { id },
    });
    message = {
      msg: "Record was updated successfully",
      userID: id,
    };
    response.success(req, res, message, 200);
  } catch (error) {
    next(error);
  }
};

const deleted = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteUser = await User.destroy({
      where: { id },
    });
    message = {
      msg: "Record was deleted successfully",
      userID: id,
    };
    response.success(req, res, message, 200);
  } catch (error) {
    next(error);
  }
};

const uploadAvatar = async (req, res, next) => {
  const { file } = req;
  console.log(file);
  let filePath = file.path;
  let imagePath = `http://localhost:3000/images/users/avatar/${file.filename}`;
  let data = {
    avatar: imagePath,
    imagePath: filePath,
  };
  try {
    const id = req.params.id;

    const user = await User.findOne({ where: { id } });
    if (user.imagePath != null) {
      fs.unlink(user.imagePath, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }

    const updateUser = await User.update(data, {
      where: { id },
    });
    message = {
      msg: "Image was modified successfully",
      user: req.body.id,
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