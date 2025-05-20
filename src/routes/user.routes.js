const router = require("express").Router();
const multer = require("multer");
const storage = require("../middleware/user-avatar.multer");

const controller = require("../controllers/user.controller");
const validation = require("../middleware/validation");

const uploader = multer({ storage });

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", controller.create);
router.put("/:id", validation(0), controller.update);
router.delete("/:id", validation(0), controller.deleted);
router.post(
  "/images/avatar/:id",
  [validation(0), uploader.single("avatar")],
  controller.uploadAvatar
);

module.exports = router;
