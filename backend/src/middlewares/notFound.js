var httpResponse = require("../utils/responses")
var httpStatus = require("../utils/constants")

function notFound(request, response, next) {
	httpResponse[httpStatus.NOT_FOUND](response)
	next("404 Not found")
}

module.exports = notFound
