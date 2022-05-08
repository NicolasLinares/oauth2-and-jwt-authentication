const GitHubStrategy = require("passport-github").Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy

const logger = require("../log")
const authController = require("../../controllers/oauthController")

const githubProvider = new GitHubStrategy(
	{
		clientID: process.env.GITHUB_AUTH_CLIENT_ID,
		clientSecret: process.env.GITHUB_AUTH_CLIENT_SECRET,
		callbackURL: process.env.CLIENT_GITHUB_CALLBACK_URL
	},
	async (request, accessToken, refreshToken, profile, cb) => {
		const userProfile = {
			id: profile.id,
			name: profile.displayName,
			login: profile.username,
			email: profile.emails[0].value,
			picture: profile.photos[0]?.value || null,
			provider: profile.provider 
		}

		const user = await authController.findOrCreate(userProfile)
			.catch((error) => {
				logger.error(error);
				cb(error, null);
			})

		if (user) {
			return cb(null, user);
		}
	})

const googleProvider = new GoogleStrategy(
	{
		clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
		clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
		callbackURL: process.env.CLIENT_GOOGLE_CALLBACK_URL,
		passReqToCallback: true,
	},
	async (request, accessToken, refreshToken, profile, cb) => {
		console.log(profile)

		const userProfile = {
			id: profile.id,
			name: profile.displayName,
			email: profile.emails[0].value,
			picture: profile.photos[0]?.value || null,
			provider: profile.provider 
		}

		const user = await authController.findOrCreate(userProfile)
			.catch((error) => {
				logger.error(error);
				cb(error, null);
			})

		if (user) {
			return cb(null, user);
		}
	})


module.exports = {
	githubProvider,
	googleProvider
}