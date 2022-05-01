require("dotenv").config();
const logger = require("./utils/log/")
const database = require("./database")
const express = require("express")
const cors = require("cors")
var bodyParser = require("body-parser")
var jsonParser = bodyParser.json()
var requestLogger = require("./middlewares/requestLogger")
var httpResponse = require("./utils/responses")
var httpStatus = require("./utils/constants")
var path = require("path")

const authController = require("./controllers/auth")
const userController = require("./controllers/users")

logger.info("Deploying server...")

database.connect()
    .then(() => {
        logger.info("Database succesfully connected")

        const app = express()
        
        
        // Middleware 
        app.use(requestLogger);
        app.use(express.static(path.join(__dirname, '../public')))
        
        app.use(cors({ origin: "http://localhost:3000", credentials: true }))

        app.get("/login/github", authController.oauth2.github.login)
        app.get("/oauth/redirect", authController.oauth2.github.getAccessToken)

        app.post('/api/users', jsonParser, userController.createUser)
        app.get('/api/users', userController.getAllUsers)
        app.get('/api/users/:id', userController.getUserById)
        app.put('/api/users/:id', jsonParser, userController.updateUserById)
        app.delete('/api/users/:id', userController.deleteUserById)

        // Middleware 
        app.use((request, response) => httpResponse[httpStatus.NOT_FOUND](response))

        const PORT = process.env.SERVER_PORT || 3080
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`)
        })

    }).catch((err) => {
        logger.error(err)
    })