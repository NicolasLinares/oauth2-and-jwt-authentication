const logger = require("../utils/log/logger")

const requestLogger = (request, response, next) => {
    let importantData = request.method
    importantData += ' ' + request.path
    importantData += request.body ? ' ' + request.body : ""
    logger.debug(`request [${importantData}]`)
    next()
}

module.exports = requestLogger