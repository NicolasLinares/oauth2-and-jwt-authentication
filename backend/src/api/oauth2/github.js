const express = require('express');
const router = express.Router();
const authController = require("../../controllers/auth")

router.get("/login/github", authController.oauth2.github.login)
router.get("/oauth/github/redirect", authController.oauth2.github.getAccessToken)

module.exports = router;
