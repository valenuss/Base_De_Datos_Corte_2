const express = require("express");
const morgan = require("morgan");
const config = require("../config");
const cors = require("cors");
const path = require("path");

const roles = require("../routes/role.routes");
const users = require("../routes/user.routes");
const posts = require("../routes/post.routes");
const auth = require("../routes/auth.routes");

// const auth = require("../routes/auth.routes");
const errorHandler = require("../middlewares/errorHandler");

const app = express();

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuracion
app.set("port", config.app.port);

//rutas
app.use("/api/roles", roles);
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/auth", auth);
app.use(errorHandler);

// public static files
app.use(express.static(path.join(__dirname, "../../uploads")));

//endpoint not found
app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

module.exports = app;
