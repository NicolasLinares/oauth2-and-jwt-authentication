require("dotenv").config();
const logger = require("./utils/log/")
const database = require("./database")
const app = require('./app');

logger.info("Deploying server...")

database.connect()
    .then(() => {
        logger.info("Database succesfully connected")

        const PORT = process.env.SERVER_PORT || 3080
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`)
        })

    }).catch((err) => {
        logger.error(err)
    })