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

const envValidator = require("../config/config")
const isGithubCondigured = envValidator.isGitHubOAuth2ServiceConfigured()
const isGoogleCondigured = envValidator.isGoogleOAuth2ServiceConfigured()

router.get("/login/google/status", (request, response) => {
    let body = {
        serviceName: "Google OAuth 2.0",
        isActive: isGoogleCondigured !== undefined
    }
    response.json(body)
})

router.get("/login/github/status", (request, response) => {
    let body = {
        serviceName: "GitHub OAuth 2.0",
        isActive: isGithubCondigured !== undefined
    }
    response.json(body)
})

// GitHub
if (isGithubCondigured) {
    const githubProvider = require("../services/auth/oauth2Github")
    passport.use(githubProvider)
    router.get("/login/github", passport.authenticate("github"))
    router.get("/oauth/github/callback",
        passport.authenticate("github"),
        authController.oauthGithubLogin
    )
}

// Google
if (isGoogleCondigured) {
    const googleProvider = require("../services/auth/oauth2Google")
    passport.use(googleProvider)
    router.get("/login/google", passport.authenticate("google", { scope: ["profile", "email"] }))
    router.get("/oauth/google/callback",
        passport.authenticate("google"),
        authController.oauthGoogleLogin
    )
}

if (isGithubCondigured || isGoogleCondigured) {
    passport.serializeUser(function(user, done) {
        done(null, user)
    })
    passport.deserializeUser(function(user, done) {
        done(null, user)
    })

    router.get("/oauth/user", middlewares.isUserAuthenticated, authController.getUserSession)
}

//#endregion

module.exports = router
