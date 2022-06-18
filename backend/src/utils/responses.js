const CONST = require("./constants")

const httpResponse = []
httpResponse[CONST.httpStatus.OK] = (response, resource) => {
    return response.json(resource)
}
httpResponse[CONST.httpStatus.NO_CONTENT] = (response) => {
    return response.status(CONST.httpStatus.NO_CONTENT)
}

httpResponse[CONST.httpStatus.CREATED] = (response, resource) => {
    let message = resource || `${CONST.httpStatus.CREATED} Created`
    return response.status(CONST.httpStatus.CREATED).json({ data: message })
}
httpResponse[CONST.httpStatus.NOT_FOUND] = (response, msg = null) => {
    let message = msg || `${CONST.httpStatus.NOT_FOUND} Not Found`
    return response.status(CONST.httpStatus.NOT_FOUND).json({ error: message })
}
httpResponse[CONST.httpStatus.BAD_REQUEST] = (response, msg = null) => {
    let message = msg || `${CONST.httpStatus.BAD_REQUEST} Bad Request`
    return response.status(CONST.httpStatus.BAD_REQUEST).json({ error: message })
}
httpResponse[CONST.httpStatus.CONFLICT] = (response, msg = null) => {
    let message = msg || `${CONST.httpStatus.CONFLICT} Conflict`
    return response.status(CONST.httpStatus.CONFLICT).json({ error: message })
}

httpResponse[CONST.httpStatus.UNAUTHORIZED] = (response, msg = null) => {
    let message = msg || `${CONST.httpStatus.UNAUTHORIZED} Unauthorized`
    return response.status(CONST.httpStatus.UNAUTHORIZED).json({ error: message })
}

httpResponse[CONST.httpStatus.INTERNAL_ERROR] = (response, msg = null) => {
    let message = msg || `${CONST.httpStatus.INTERNAL_ERROR} Internal server error`
    return response.status(CONST.httpStatus.INTERNAL_ERROR).json({ error: message })
}

module.exports = httpResponse