
const logger = require("../services/log")
const CONST = require("../utils/constants")
var httpResponse = require("../utils/responses")
const jwt = require('jsonwebtoken');


const isUserAuthenticated = (request, response, next) => {

	logger.debug("Verifying JWT...")

	const jwtToken = request.cookies.jwt;
	jwt.verify(jwtToken, process.env.TOKEN_SECRET, (error, decodedToken) => {
		if (error) {
			logger.error(`Error during JWT verification: ${error}`)
			httpResponse[CONST.httpStatus.UNAUTHORIZED](response, "You must login first!")
		} else {
			let { id, email } = decodedToken
			logger.debug(`Successful JWT verification for user with email [${email}]`)
			next()
		}
	}) 
	
	// || verifyOAuth2Session(request)

	// if (!isCorrect) {
	// 	logger.debug("Unauthorized resource")
	// 	httpResponse[CONST.httpStatus.UNAUTHORIZED](response, "You must login first!")
	// }

	// request.user.authenticated = isCorrect
	// next()
}

const verifyTokenJWT = (jwtToken) => {
    try {
		if (!jwtToken) {
			return false
		}
		logger.trace("Verifiying token JWT...")
		return jwt.verify(jwtToken, process.env.TOKEN_SECRET)
    } catch (error) {
		logger.error(`Error during JWT session verification. ${error}`)
		return false;
	}
}

const verifyOAuth2Session = (request) => {
    try {
		logger.trace("Verifiying OAuth 2.0 session...")
		return request.isAuthenticated()
    } catch (error) {
		logger.error(`Error during OAuth 2.0 session verification. ${error}`)
		return false;
	}
}

module.exports = isUserAuthenticated