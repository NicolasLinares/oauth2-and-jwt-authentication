const GitHubStrategy = require("passport-github").Strategy
const logger = require("../log")
const userManager = require("../../managers/userManager")

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
		const user = await userManager.findOrCreate(userProfile)
			.catch((error) => {
				logger.error(error);
				cb(error, null);
			})

		if (user) {
			logger.trace("Serializing...")
			return cb(null, user);
		}
	})


module.exports = githubProvider