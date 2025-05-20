const express = require ("express");
const router = express.Router();
const controller = require ("../controllers/role.controller");
const validation = require ("../middleware/validation");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", controller.create);
router.get("/", validation(0), controller.update);
router.delete("/:id", validation(0), controller.deleted);

module.exports = router;
