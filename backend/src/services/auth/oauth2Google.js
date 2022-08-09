
const GoogleStrategy = require("passport-google-oauth20").Strategy

const googleProvider = new GoogleStrategy({
		clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
		clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
		callbackURL: process.env.CLIENT_GOOGLE_CALLBACK_URL,
	},
	(accessToken, refreshToken, profile, done) => {
		return done(null, profile)
	}
)


module.exports = googleProvider