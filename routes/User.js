const express = require("express");
const router = express.Router();

const controller = require("../controllers/UserController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/auto-login", verifyToken, controller.autoLogin);

module.exports = router;
