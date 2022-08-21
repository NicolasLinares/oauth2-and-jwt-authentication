const CONST = require("../utils/constants")

function notFound(request, response) {
    response.status(CONST.httpStatus.NOT_FOUND)
    response.json({ error: "404 Not found" })
}

module.exports = notFound
