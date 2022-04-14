const logger = require("../utils/log/logger")

const notFoundStatus = 404;

const notFoundResponse = (request, response) => {
    logger.error("Error 404 - not found")

    response.status(notFoundStatus).json({
        error: 'Not found'
    })
}

module.exports = notFoundResponse