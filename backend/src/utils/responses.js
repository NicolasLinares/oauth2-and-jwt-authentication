const httpStatus = require("./constants")

const httpResponse = []
httpResponse[httpStatus.OK] = (response, resource) => {
    return response.json(resource)
}
httpResponse[httpStatus.NO_CONTENT] = (response) => {
    return response.status(httpStatus.NO_CONTENT)
}

httpResponse[httpStatus.CREATED] = (response, resource) => {
    let message = resource || `${httpStatus.CREATED} Created`
    return response.status(httpStatus.CREATED).json({ data: message })
}
httpResponse[httpStatus.NOT_FOUND] = (response, msg = null) => {
    let message = msg || `${httpStatus.NOT_FOUND} Not found`
    return response.status(httpStatus.NOT_FOUND).json({ error: message })
}
httpResponse[httpStatus.BAD_REQUEST] = (response, msg = null) => {
    let message = msg || `${httpStatus.BAD_REQUEST} Bad request`
    return response.status(httpStatus.BAD_REQUEST).json({ error: message })
}
httpResponse[httpStatus.CONFLICT] = (response, msg = null) => {
    let message = msg || `${httpStatus.CONFLICT} Conflict`
    return response.status(httpStatus.CONFLICT).json({ error: message })
}

module.exports = httpResponse