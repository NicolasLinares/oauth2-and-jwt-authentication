
const envValidator = require("../../config/config")
if (!envValidator.isGitHubOAuth2ServiceConfigured()) {
    return
}

const GitHubStrategy = require("passport-github").Strategy

const githubProvider = new GitHubStrategy({
    clientID: process.env.GITHUB_AUTH_CLIENT_ID,
    clientSecret: process.env.GITHUB_AUTH_CLIENT_SECRET,
    callbackURL: process.env.CLIENT_GITHUB_CALLBACK_URL
},
(accessToken, refreshToken, profile, done) => {
    return done(null, profile)
}
)


module.exports = githubProvider