const logger = require("../services/log")

function validateDatabaseConfiguration() {
    logger.info("Database: ")

    // Check MONGODB connection string
    if (isMongoDBDatabaseConfigured()) {
        logger.info("   ✅ MongoDB configured!")
        return
    }

    logger.error("   ❌ MongoDB connection string not established")
    logger.info("   ✅ Database mock service")
}

function validateAuthConfiguration() {
    logger.info("Authentication: ")

    // JWT authentication
    if (!isJWTServiceConfigured()) {
        process.env.TOKEN_SECRET = "mytokensecret"
        logger.info("   ✅ JWT configured!")
    }
    // OAuth2.0 - GitHub Provider
    checkGitHubConfigurationProperties()
    isGitHubOAuth2ServiceConfigured()
        ? logger.info("   ✅ GitHub OAuth 2.0 configured!")
        : logger.error("   ❌ GitHub OAuth 2.0 not configured!")
    // OAuth2.0 - Google Provider
    checkGoogleConfigurationProperties()
    isGoogleOAuth2ServiceConfigured()
        ? logger.info("   ✅ Google OAuth 2.0 configured!")
        : logger.error("   ❌ Google OAuth 2.0 not configured!")
}

function isMongoDBDatabaseConfigured() {
    return process.env.DB_CONNECTION_STRING != undefined
}

function checkGoogleConfigurationProperties() {
    !process.env.GOOGLE_AUTH_CLIENT_ID && logger.warn("   ❗️ Google Client ID not established")
    !process.env.GOOGLE_AUTH_CLIENT_SECRET && logger.warn("   ❗️ Google Client Secret not established")
    !process.env.CLIENT_GOOGLE_CALLBACK_URL && logger.warn("   ❗️ Google Callback not established")
}

function checkGitHubConfigurationProperties() {
    !process.env.GITHUB_AUTH_CLIENT_ID && logger.warn("   ❗️ GitHub Client ID not established")
    !process.env.GITHUB_AUTH_CLIENT_SECRET && logger.warn("   ❗️ GitHub Client Secret not established")
    !process.env.CLIENT_GITHUB_CALLBACK_URL && logger.warn("   ❗️ GitHub Callback not established")
}

function isGoogleOAuth2ServiceConfigured() {
    return process.env.GOOGLE_AUTH_CLIENT_ID
        && process.env.GOOGLE_AUTH_CLIENT_SECRET
        && process.env.CLIENT_GOOGLE_CALLBACK_URL
}

function isGitHubOAuth2ServiceConfigured() {
    return process.env.GITHUB_AUTH_CLIENT_ID
        && process.env.GITHUB_AUTH_CLIENT_SECRET
        && process.env.CLIENT_GITHUB_CALLBACK_URL
}

function isJWTServiceConfigured() {
    return process.env.TOKEN_SECRET != undefined
}

module.exports = {
    validateDatabaseConfiguration,
    validateAuthConfiguration,
    isGoogleOAuth2ServiceConfigured,
    isGitHubOAuth2ServiceConfigured,
    isJWTServiceConfigured
}