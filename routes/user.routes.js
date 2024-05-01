const express = require("express");
const userController = require("../controller/user.controller");

const router = express.Router();

router.post("/register", userController.create);
router.post("/enable-2fa", userController.enableTwoWayAuth);
router.post("/verify-2fa", userController.verifyTwoWayAuth);

module.exports = router;
