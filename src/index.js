const app = require("./app/app");

const port = app.listen(app.get("port"), () => {
  console.log("Servidor escuchando en el puerto", app.get("port"));
});
