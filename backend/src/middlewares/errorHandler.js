const CONST = require("../utils/constants")

function errorHandler(error, request, response, next) {
	response.status(error.status || CONST.httpStatus.INTERNAL_ERROR)
	response.json({ error: error })
}

module.exports = errorHandler
