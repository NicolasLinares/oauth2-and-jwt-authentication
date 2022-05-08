const express = require("express")
const router = express.Router()
const passport = require("passport")
const database = require("../services/database")
const strategy = require("../services/oauth2")

passport.use(strategy.githubProvider)
passport.use(strategy.googleProvider)


passport.serializeUser((user, cb) => {
	cb(null, user.id)
})

passport.deserializeUser(async (id, cb) => {
	const user = await database.getExternalUserById(id)
		.catch(err => {
			cb(err, null);
		})

	if (user) cb(null, user);
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
		console.log("Github User: ", req.user);
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
		console.log("Google User: ", req.user);
		res.send("Thank you for signing in!");
	}
)


module.exports = router;
