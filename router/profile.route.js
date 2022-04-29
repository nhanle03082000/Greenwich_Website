const router = require("express").Router();

const profileController = require("./../controllers/profile.controller");
const middleware = require("./../helpers/middleware");
router.post("/change-password", profileController.change_password);
module.exports = router;
