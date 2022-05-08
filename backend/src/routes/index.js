const express = require('express');
const router = express.Router();

const oauthLoginApi = require("./oauth")
const usersApi = require("./users")

// const registerApi = require('./register');
// const loginApi = require('./login');

// router.use(registerApi);
// router.use(loginApi);

router.use(oauthLoginApi)
router.use(usersApi)

module.exports = router;
