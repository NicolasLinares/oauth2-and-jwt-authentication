const CONST = require("../utils/constants")

// eslint-disable-next-line no-unused-vars
function errorHandler(error, request, response, next) {
    response.status(error.status || CONST.httpStatus.INTERNAL_ERROR)
    response.json({ error: error })
}

module.exports = errorHandler
