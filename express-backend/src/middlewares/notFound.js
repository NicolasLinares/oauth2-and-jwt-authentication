const CONST = require("../utils/constants")

function notFound(request, response, next) {
    response.status(CONST.httpStatus.NOT_FOUND)
    next("404 Not found")
}

module.exports = notFound
