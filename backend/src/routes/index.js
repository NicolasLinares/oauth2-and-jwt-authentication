const express = require('express');
const router = express.Router();

const registerApi = require('./register');
const loginApi = require('./login');
const oauthLoginApi = require("./oauth")
const usersApi = require("./users")



router.use(registerApi)
router.use(loginApi)
router.use(oauthLoginApi)
router.use(usersApi)

module.exports = router
