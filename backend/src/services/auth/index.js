
const githubProvider = require('./oauth2Github')
const googleProvider = require('./oauth2Google')
const jwt = require('./jwt')


module.exports = {
	oauth2GithubProvider: githubProvider,
	oauth2GoogleProvider: googleProvider,
	jwt
}