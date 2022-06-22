const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const middlewares = require("../middlewares")
const passport = require("passport")
const strategy = require("../services/auth")

passport.use(strategy.jwt)

router.post('/login', authController.login)

router.get('/oauth/user', middlewares.isUserAuthenticated, authController.getUserSession)

module.exports = router;
