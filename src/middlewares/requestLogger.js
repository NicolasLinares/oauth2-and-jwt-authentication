const requestLogger = (request, response, next) => {
    let importantData = request.method
    importantData += ' ' + request.path
    importantData += request.body ? ' ' + request.body : ""

    console.log(`[request]: ${importantData}`)
    next()
}

module.exports = requestLogger