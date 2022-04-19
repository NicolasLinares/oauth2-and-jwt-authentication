require("dotenv").config();
const logger = require("./utils/log/")
const database = require("./database");
const express = require("express")
var bodyParser = require("body-parser")
var jsonParser = bodyParser.json()
var requestLogger = require("./middlewares/requestLogger")
var httpResponse = require("./utils/responses")
var httpStatus = require("./utils/constants")
var path = require("path")

const userController = require("./controllers/users")

logger.info("Deploying server...")

database.connect()
    .then(() => {
        logger.info("Database succesfully connected")

        const app = express()

        // Middleware 
        app.use(requestLogger);

        app.use(express.static(path.join(__dirname, '../public')))

        app.post('/api/users', jsonParser, userController.createUser)
        app.get('/api/users', userController.getAllUsers)
        app.get('/api/users/:id', userController.getUserById)
        app.put('/api/users/:id', jsonParser, userController.updateUserById)
        app.delete('/api/users/:id', userController.deleteUserById)

        // Middleware 
        app.use((request, response) => httpResponse[httpStatus.NOT_FOUND](response))

        const PORT = process.env.SERVER_PORT || 3001
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`)
        })

    }).catch((err) => {
        logger.error(err)
    })