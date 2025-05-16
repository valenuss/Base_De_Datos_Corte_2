const Auth = require("../models/auth.model");
const User = require("../models/user.model");
const response = require("../red/response");
const bcrypt = require("bcrypt");
const auth = require("../auth");

// Iniciar sesión
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Buscar Auth por email
    const data = await Auth.findOne({ where: { email } });
    if (!data) throw new Error("Auth record not found");

    // Buscar el usuario vinculado (relación 1:1)
    const user = await User.findOne({ where: { id: data.id } });
    if (!user) throw new Error("User not found");

    // Validar contraseña
    const isValid = await bcrypt.compare(password, data.password);
    if (!isValid) throw new Error("Invalid credentials");

    // Generar token y respuesta
    const resp = {
      token: auth.assignToken({ id: data.id, email: data.email }),
      user: user,
    };

    response.success(req, res, resp, 200);
  } catch (error) {
    next(error);
  }
};

// Crear una cuenta de autenticación
const create = async (req, res, next) => {
  try {
    const { id, email, password } = req.body;

    await Auth.sync();

    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    const createAuth = await Auth.create({
      id, // clave foránea desde User
      email,
      password: hashedPassword,
    });

    const message = {
      msg: "Auth record was created successfully",
      authID: createAuth.id,
    };

    response.success(req, res, message, 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  create,
};