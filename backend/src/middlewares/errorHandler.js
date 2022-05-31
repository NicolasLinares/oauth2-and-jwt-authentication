const logger = require("../services/log")

function errorHandler(error, request, response, next) {
	logger.error(error.stack)
}

module.exports = errorHandler
