const auth = require("../auth");

module.exports = function chequearAuth(type) {
  function middleware(req, res, next) {
    const id = req.params.id;
    auth.checkToken.confirmToken(req, id, type);
    next();
  }

  return middleware;
};
