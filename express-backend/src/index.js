const logger = require("./services/log/")
const database = require("./services/database")
const app = require("./app")

const envValidator = require("./config/config")

logger.info("Checking configuration...")
envValidator.validateServerConfiguration()
envValidator.validateDatabaseConfiguration()
envValidator.validateAuthConfiguration()

logger.info("Deploying server...")

database.connect()
    .then(() => {
        logger.info("Database succesfully connected")

        const PORT = process.env.BACK_PORT
        const backUri = `http://${process.env.BACK_HOST}:${PORT}`
        
        app.listen(PORT, () => {
            logger.info(`Server running on ${backUri}`)
        })
    
    }).catch((err) => {
        logger.error(err)
    })