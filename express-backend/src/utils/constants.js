const httpStatus = {
    OK: 200,
    NO_CONTENT: 204,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_ERROR: 500
}


const OAuthProviders = {
    GitHub: "GitHub",
    Google: "Google",
}

const maxAgeCookieExpired = 1 * 24 * 60 * 60 * 1000
 
const CONST = { httpStatus, OAuthProviders, maxAgeCookieExpired}


module.exports = CONST