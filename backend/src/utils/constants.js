const httpStatus = {
    OK: 200,
    NO_CONTENT: 204,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
}


const OAuthProviders = {
    GitHub: "GitHub",
    Google: "Google",
}


const CONST = { httpStatus, OAuthProviders}


module.exports = CONST