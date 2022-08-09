const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const middlewares = require("../middlewares")

router.post('/login', authController.login)

router.get('/oauth/user', middlewares.isUserAuthenticated, authController.getUserSession)

module.exports = router;
