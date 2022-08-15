var httpResponse = require("../utils/responses")
const CONST = require("../utils/constants")

function notFound(request, response, next) {
    httpResponse[CONST.httpStatus.NOT_FOUND](response)
    next("404 Not found")
}

module.exports = notFound
