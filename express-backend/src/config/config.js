const logger = require("../services/log")

const DEFAULT_BACK_HOST = "localhost"
const DEFAULT_BACK_PORT = 3080
const DEFAULT_FRONT_HOST = "localhost"
const DEFAULT_FRONT_PORT = 3000

function validateServerConfiguration() {
    logger.info("Server: ")

    if (!isBackHostConfigured()) {
        process.env.BACK_HOST = DEFAULT_BACK_HOST
    }
    if (!isBackPortConfigured()) {
        process.env.BACK_PORT = DEFAULT_BACK_PORT
    }

    if (!isFrontHostConfigured()) {
        process.env.FRONT_HOST = DEFAULT_FRONT_HOST
    }
    if (!isFrontPortConfigured()) {
        process.env.FRONT_PORT = DEFAULT_FRONT_PORT
    }
    const backUri = `http://${process.env.BACK_HOST}:${process.env.BACK_PORT}`
    const frontUri = `http://${process.env.FRONT_HOST}:${process.env.FRONT_PORT}`

    logger.info(`   ✅ Back uri: ${backUri}`)
    logger.info(`   ✅ Front uri: ${frontUri}`)
}

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
    }
    logger.info("   ✅ JWT configured!")

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

function isBackHostConfigured() {
    return process.env.BACK_HOST != undefined
}

function isBackPortConfigured() {
    return process.env.BACK_PORT != undefined
}

function isFrontHostConfigured() {
    return process.env.FRONT_HOST != undefined
}

function isFrontPortConfigured() {
    return process.env.FRONT_PORT != undefined
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
    validateServerConfiguration,
    validateDatabaseConfiguration,
    validateAuthConfiguration,
    isGoogleOAuth2ServiceConfigured,
    isGitHubOAuth2ServiceConfigured,
    isJWTServiceConfigured
}