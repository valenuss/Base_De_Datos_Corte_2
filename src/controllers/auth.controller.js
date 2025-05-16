const Auth = require("../models/auth.model");
const User = require("../models/user.model");
const response = require("../red/response");
const bcrypt = require("bcrypt");
const auth = require("../auth");

async function login(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  try {
    const data = await Auth.findOne({ where: { email } });
    const user = await User.findOne({ where: { email } });
    const resp = await validatePassword(password, data.password, data, user);
    response.success(req, res, resp, 200);
  } catch (error) {
    next(error);
  }
}

const create = async (req, res, next) => {
  try {
    const data = req.body;
    await Auth.sync();
    password = await bcrypt.hash(data.password.toString(), 10);
    createAuth = await Auth.create({
      id: data.id,
      email: data.email,
      password: password,
    });
    message = {
      msg: "Record was created successfully",
      roleID: createAuth.id,
    };
    response.success(req, res, message, 201);
  } catch (error) {
    next(error);
  }
};

const validatePassword = (pass1, pass2, data, user) => {
  return bcrypt.compare(pass1, pass2).then((res) => {
    if (res === true) {
      //generate token
      data.role_id = user.role_id;
      var resp = {
        token: auth.assignToken({ ...data }),
        user: user,
      };
      return resp;
    } else {
      throw new Error("invalid information");
    }
  });
};

module.exports = {
  create,
  login,
};