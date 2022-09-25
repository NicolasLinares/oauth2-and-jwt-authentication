
const envValidator = require("../../config/config")
if (!envValidator.isGitHubOAuth2ServiceConfigured()) {
    return
}

const githubCallbackURL = `http://${process.env.BACK_HOST}:${process.env.BACK_PORT}/api/v1${process.env.CLIENT_GITHUB_CALLBACK_URL}`

const GitHubStrategy = require("passport-github").Strategy

const githubProvider = new GitHubStrategy({
    clientID: process.env.GITHUB_AUTH_CLIENT_ID,
    clientSecret: process.env.GITHUB_AUTH_CLIENT_SECRET,
    callbackURL: githubCallbackURL
},
(accessToken, refreshToken, profile, done) => {
    return done(null, profile)
}
)


module.exports = githubProvider