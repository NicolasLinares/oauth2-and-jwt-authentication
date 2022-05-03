const logger = require("../utils/log")

function errorHandler(error, request, response, next) {

	logger.error(error)
	//logger.error(error.stack)
}

module.exports = errorHandler
