const express = require('express');
const router = express.Router();

const githubLoginApi = require("./oauth2/github")
const usersApi = require("./users")

// const registerApi = require('./register');
// const loginApi = require('./login');
// const loginWithGoogleApi = require('./loginWithGoogle');
// const userApi = require('./user');

// router.use(registerApi);
// router.use(loginApi);
// router.use(loginWithGoogleApi);
// router.use(userApi);

router.use(githubLoginApi)
router.use(usersApi)

module.exports = router;
