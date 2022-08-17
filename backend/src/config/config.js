const logger = require("../services/log")

function validateDatabaseConfiguration() {
    // MONGODB connection string
    logger.info("Validating database configuration...")
    if (!process.env.DB_CONNECTION_STRING) {
        logger.warn("MongoDB connection string not established. MongoDB mock will be used instead...")
    }
}

function validateAuthenticationServices() {
    logger.info("Validating authentication services...")

    // JWT authentication
    logger.info("Validating JWT configuration")
    if (!process.env.TOKEN_SECRET) {
        logger.warn("Token secret not established. Setting value for token secret.")
        process.env.TOKEN_SECRET = "mytokensecret"
        logger.info("JWT configuration OK!")
    }

    // OAuth2.0 - GitHub Provider
    process.env.GITHUB_AUTH_ENABLED = false
    logger.info("Validating GitHub OAuth 2.0 configuration...")
    !process.env.GITHUB_AUTH_CLIENT_ID && logger.error("GitHub Client ID not established. Imposible to enable GitHub authentication.")
    !process.env.GITHUB_AUTH_CLIENT_SECRET && logger.error("GitHub Client Secret not established. Imposible to enable GitHub authentication.")

    if (process.env.GITHUB_AUTH_CLIENT_ID && process.env.GITHUB_AUTH_CLIENT_SECRET) {
        logger.info("GitHub OAuth 2.0 configuration OK!")
        process.env.GITHUB_AUTH_ENABLED = true
    }

    // # OAuth2.0 - Google Provider
    process.env.GOOGLE_AUTH_ENABLED = false
    logger.debug("Validating Google OAuth 2.0 configuration...")
    !process.env.GOOGLE_AUTH_CLIENT_ID && logger.error("Google Client ID not established. Imposible to enable Google authentication.")
    !process.env.GOOGLE_AUTH_CLIENT_SECRET && logger.error("Google Client Secret not established. Imposible to enable Google authentication.")

    if (process.env.GOOGLE_AUTH_CLIENT_ID && process.env.GOOGLE_AUTH_CLIENT_SECRET) {
        logger.info("Google OAuth 2.0 configuration OK!")
        process.env.GOOGLE_AUTH_ENABLED = true
    }
}

module.exports = {
    validateDatabaseConfiguration, 
    validateAuthenticationServices
}