const express = require("express")
const router = express.Router()
const passport = require("passport")
const strategy = require("../services/auth")
const CONST = require("../utils/constants")
const userManager = require("../managers/userManager")
const generateJWT = require("../utils/jwt")
const logger = require("../services/log")

passport.use(strategy.oauth2GithubProvider)
passport.use(strategy.oauth2GoogleProvider)

passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    done(null, user)
})

const successLoginUrl = process.env.SUCCESSFUL_LOGIN_REDIRECT
const failureLoginUrl = process.env.FAILED_LOGIN_REDIRECT

router.get("/login/github", passport.authenticate("github"))
router.get("/oauth/github/callback",
    passport.authenticate("github"),
    async (request, response) => {

        const userProfile = {
            id: request.user.id,
            name: request.user._json.name || "",
            login: request.user._json.login,
            email: request.user._json.email,
            picture: request.user._json.avatar_url,
            provider: request.user.provider
        }
		
        let user = await findOrRegisterUser(userProfile)
            .catch((error) => {
                logger.error(error)
                response.redirect(failureLoginUrl)
            })

        const token = generateJWT(user.id, user.email, userProfile.id)
        response.cookie("jwt", token, { httpOnly: true, maxAge: CONST.maxAgeCookieExpired })
        response.redirect(successLoginUrl)
    }
)

router.get("/login/google", passport.authenticate("google", { scope: ["profile", "email"] }))

router.get("/oauth/google/callback",
    passport.authenticate("google"),
    async (request, response) => {
        const userProfile = {
            id: request.user.id,
            name: request.user.displayName,
            email: request.user._json.email,
            picture: request.user._json.picture || null,
            provider: request.user.provider 
        }

        let user = await findOrRegisterUser(userProfile)
            .catch((error) => {
                logger.error(error)
                response.redirect(failureLoginUrl)
            })

        const token = generateJWT(user.id, user.email, userProfile.id)
        response.cookie("jwt", token, { httpOnly: true, maxAge: CONST.maxAgeCookieExpired })
        response.redirect(successLoginUrl)
    }
)

async function findOrRegisterUser(userProfile) {
    return await userManager.getUserByProviderId(userProfile.id)
        .then(user => {
            if (!user) {
                return userManager.findOrCreate(userProfile)
            }
            return user
        })
}

module.exports = router
