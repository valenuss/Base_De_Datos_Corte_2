const Role = require("../models/role.model");
const response = require("../red/response");
const getAll = async (req, res, next) => {
  try {
    const roles = await Role.findAll();
    let data = "";
    if (roles.length > 0) {
      data = {
        total_roles: roles.length,
        roles: roles,
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
    const role = await Role.findOne({ where: { id } });
    let data = "";
    if (role) {
      data = {
        role: role,
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
    await Role.sync();
    const createRole = await Role.create(data);
    message = {
      msg: "Record was created successfully",
      roleID: createRole.id,
    };
    response.success(req, res, message, 201);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const data = req.body;
    const id = req.params.id;
    const updateRole = await Role.update(data, {
      where: { id },
    });
    message = {
      msg: "Record was updated successfully",
      roleID: id,
    };
    response.success(req, res, message, 200);
  } catch (error) {
    next(error);
  }
};

const deleted = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteRole = await Role.destroy({
      where: { id },
    });
    message = {
      msg: "Record was deleted successfully",
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