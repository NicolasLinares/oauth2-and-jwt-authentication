const express = require("express")
const router = express.Router()
const passport = require("passport")
const strategy = require("../services/oauth2")

passport.use(strategy.githubProvider)
passport.use(strategy.googleProvider)

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
	passport.authenticate("github", {
		failureMessage: "Cannot login to GitHub, please try again later!",
		failureRedirect: failureLoginUrl,
		successRedirect: successLoginUrl,
	}),
	function (req, res) {
		res.send("Thank you for signing in!");
	}
)

router.get("/login/google", passport.authenticate("google", { scope: ["profile", "email"] }))
router.get("/oauth/google/callback",
	passport.authenticate("google", {
		failureMessage: "Cannot login to Google, please try again later!",
		failureRedirect: failureLoginUrl,
		successRedirect: successLoginUrl,
	}),
	(req, res) => {
		res.send("Thank you for signing in!")
	}
)


module.exports = router;
