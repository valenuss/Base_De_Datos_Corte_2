//error centralizado de peticiones
const response = require("./response");

function errors(err, req, res, next) {
  console.error("Error:", err);

  const message = err.message || "Internal Server Error";
  let status = err.statusCode || 500;

  response.error(req, res, message, status);
}

module.exports = errors;
