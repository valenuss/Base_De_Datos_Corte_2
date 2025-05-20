const { UserRole, User, Role } = require("../models"); // asegúrate que el index.js exporta todo
const { successResponse, errorResponse } = require("../utils/response");
const createUserRole = async (req, res) => {
  try {
    const { user_id, role_id } = req.body;
    const relation = await UserRole.create({ user_id, role_id });
    return successResponse(res, relation, "Relación creada correctamente", 201);
  } catch (error) {
    return errorResponse(res, error, "Error al crear relación", 500);
  }
};

const getRolesByUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: [{ model: Role, as: "Roles" }]
    });
    return successResponse(res, user?.Roles || [], "Roles encontrados", 200);
  } catch (error) {
    return errorResponse(res, error, "Error al obtener roles", 500);
  }
};

const getUsersByRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.roleId, {
      include: [{ model: User, as: "Users" }]
    });
    return successResponse(res, role?.Users || [], "Usuarios encontrados", 200);
  } catch (error) {
    return errorResponse(res, error, "Error al obtener usuarios", 500);
  }
};

const deleteUserRole = async (req, res) => {
  try {
    const { user_id, role_id } = req.body;
    await UserRole.destroy({ where: { user_id, role_id } });
    return successResponse(res, null, "Relación eliminada correctamente", 200);
  } catch (error) {
    return errorResponse(res, error, "Error al eliminar relación", 500);
  }
};

module.exports = {
  createUserRole,
  getRolesByUser,
  getUsersByRole,
  deleteUserRole
};
