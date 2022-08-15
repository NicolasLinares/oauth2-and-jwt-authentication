const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const middlewares = require("../middlewares")

//#region Basic user login and register

router.post("/login", authController.login)
router.post("/register", authController.register)
//#endregion


//#region OAuth 2.0

const passport = require("passport")
const strategy = require("../services/auth")

// GitHub
passport.use(strategy.oauth2GithubProvider)
router.get("/login/github", passport.authenticate("github"))
router.get("/oauth/github/callback",
    passport.authenticate("github"),
    authController.oauthGithubLogin
)

// Google
passport.use(strategy.oauth2GoogleProvider)
router.get("/login/google", passport.authenticate("google", { scope: ["profile", "email"] }))
router.get("/oauth/google/callback",
    passport.authenticate("google"),
    authController.oauthGoogleLogin
)

passport.serializeUser(function(user, done) {
    done(null, user)
})
passport.deserializeUser(function(user, done) {
    done(null, user)
})
//#endregion

router.get("/oauth/user", middlewares.isUserAuthenticated, authController.getUserSession)

module.exports = router
