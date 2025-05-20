const jwt = require("jsonwebtoken");
const config = require("../config");
const error = require("../middleware/error");

const secret = config.jwt.secret;

function assignToken(data) {
  return jwt.sign(data, secret);
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

const checkToken = {
  confirmToken: function (req, id, type) {
    const decode = decodeHeader(req);
    console.log(decode);
    if (type === 0) {
      if (
        decode.dataValues.id != id &&
        decode.role_id != "90a0f9f4-d670-486a-8cd4-f56cdcbf9cb0"
      ) {
        throw error("You don't have privileges to do this operation", 401);
      }
    }
  },
};

function getToken(authorization) {
  if (!authorization) {
    throw error("No token provided", 401);
  }

  if (authorization.indexOf("Bearer") === -1) {
    throw error("Invalid Format", 401);
  }

  let token = authorization.replace("Bearer ", "");
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decode = verifyToken(token);

  req.user = decode;

  return decode;
}

module.exports = {
  assignToken,
  checkToken,
};
