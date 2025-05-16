const express = require ("express");
const controller = require ("../controller/auth.controller");
const router = express.router();

router.get("/login", controller.login);
router.post("/", controller.create);

module.exports = router;