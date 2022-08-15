const express = require("express")
const router = express.Router()
const passport = require("passport")
const strategy = require("../services/auth")
const authController = require("../controllers/authController")

passport.use(strategy.oauth2GithubProvider)
passport.use(strategy.oauth2GoogleProvider)

passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    done(null, user)
})

router.get("/login/github", passport.authenticate("github"))
router.get("/oauth/github/callback",
    passport.authenticate("github"),
    authController.oauthGithubLogin
)

router.get("/login/google", passport.authenticate("google", { scope: ["profile", "email"] }))
router.get("/oauth/google/callback",
    passport.authenticate("google"),
    authController.oauthGoogleLogin
)

module.exports = router
