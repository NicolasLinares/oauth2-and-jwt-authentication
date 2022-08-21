
let clientId = process.env.GOOGLE_AUTH_CLIENT_ID
let clientSecret = process.env.GOOGLE_AUTH_CLIENT_SECRET
let callback = process.env.CLIENT_GOOGLE_CALLBACK_URL

if (!clientId && !clientSecret && !callback) {
    return
}

const GoogleStrategy = require("passport-google-oauth20").Strategy

const googleProvider = new GoogleStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: callback,
},
(accessToken, refreshToken, profile, done) => {
    return done(null, profile)
}
)


module.exports = googleProvider