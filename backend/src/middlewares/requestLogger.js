const logger = require("../services/log")

function requestLogger (request, response, next) {
    let importantData = request.method
    importantData += ' ' + request.path
    importantData += request.body && ""
    logger.debug(`request [${importantData}]`)
    next()
}

module.exports = requestLogger