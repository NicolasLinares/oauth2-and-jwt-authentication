
const GoogleStrategy = require("passport-google-oauth20").Strategy
const logger = require("../log")
const userManager = require("../../managers/userManager")

const googleProvider = new GoogleStrategy(
	{
		clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
		clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
		callbackURL: process.env.CLIENT_GOOGLE_CALLBACK_URL,
		passReqToCallback: true,
	},
	async (request, accessToken, refreshToken, profile, cb) => {

		const userProfile = {
			id: profile.id,
			name: profile.displayName,
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


module.exports = googleProvider