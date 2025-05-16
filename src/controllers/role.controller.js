const Role = require("../models/role.model");
const User = require("../models/user.model");
const response = require("../red/response");

// Obtener todos los roles con los usuarios asociados
const getAll = async (req, res, next) => {
  try {
    const roles = await Role.findAll({
      include: { model: User, as: "Users" } // relación N:M
    });

    let data = roles.length > 0
      ? { total_roles: roles.length, roles }
      : { message: "This table has no records" };

    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
};

// Obtener un solo rol por ID
const getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const role = await Role.findOne({
      where: { id },
      include: { model: User, as: "Users" } // incluir usuarios asociados
    });

    let data = role
      ? { role }
      : { message: "This query has no records" };

    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo rol
const create = async (req, res, next) => {
  try {
    const data = req.body;
    await Role.sync();
    const newRole = await Role.create(data);

    const message = {
      msg: "Role created successfully",
      roleID: newRole.id,
    };

    response.success(req, res, message, 201);
  } catch (error) {
    next(error);
  }
};

// Actualizar un rol existente
const update = async (req, res, next) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await Role.update(data, { where: { id } });

    const message = {
      msg: "Role updated successfully",
      roleID: id,
    };

    response.success(req, res, message, 200);
  } catch (error) {
    next(error);
  }
};

// Eliminar un rol por ID
const deleted = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Role.destroy({ where: { id } });

    const message = {
      msg: "Role deleted successfully",
      roleID: id,
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
};