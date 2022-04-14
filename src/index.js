const dotenv = require("dotenv").config();
const logger = require("./utils/log/")
const database = require("./database")

logger.info("Deploying server...")

database.connect()
    .then(() => {
        logger.info("Database succesfully connected")

        const express = require("express")
        const requestLogger = require("./middlewares/requestLogger")
        const notFoundResponse = require("./middlewares/404")
        const app = express()

        // Middleware 
        app.use(requestLogger);

        app.get('/', (request, response) => {
            response.send('<h1> Hello world! </h1>')
        })

        app.get('/users', (request, response) => {
            database.getUsers()
                .then(result => {
                    response.contentType = "application/json"
                    response.send(result)
                })
                .catch(err => {
                    logger.error(err)
                })
        })

        // Middleware 
        app.use(notFoundResponse)

        const PORT = process.env.SERVER_PORT
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`)
        })

    }).catch((err) => {
        logger.error(err)
    })