
const logger = require("../services/log")

const isUserAuthenticated = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		logger.debug("Unauthorized resource")
		res.status(401).send('You must login first!')
	}
}

module.exports = isUserAuthenticated