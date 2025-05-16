const router = require("express").Router();
const controller = require("../controllers/userRole.controller");

router.post("/", controller.createUserRole);
router.get("/user/:userId", controller.getRolesByUser);
router.get("/role/:roleId", controller.getUsersByRole);
router.delete("/", controller.deleteUserRole);

module.exports = router;
