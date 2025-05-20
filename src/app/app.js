const express = require("express");
const config = require("../config");
const cors = require("cors");
const path = require("path");

const roles = require("../routes/role.routes");
const users = require("../routes/user.routes");
const userRole = require("../routes/userRole.routes");
const auth = require("../routes/auth.routes");

// const auth = require("../routes/auth.routes");
const error = require("../middleware/error");

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuracion
app.set("port", config.app.port);

//rutas
app.use("/api/roles", roles);
app.use("/api/users", users);
app.use("/api/user-role", userRole);
app.use("/api/auth", auth);
app.use(error);

// public static files
app.use(express.static(path.join(__dirname, "../../uploads")));

//endpoint not found
app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

module.exports = app;
