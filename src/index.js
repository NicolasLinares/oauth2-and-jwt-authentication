require("dotenv").config();
const logger = require("./utils/log/")
const database = require("./database");

logger.info("Deploying server...")

database.connect()
    .then(() => {
        logger.info("Database succesfully connected")

        const express = require("express")
        var bodyParser = require('body-parser')

        var requestLogger = require("./middlewares/requestLogger")
        var httpResponse = require("./utils/responses")
        var httpStatus = require("./utils/constants")

        const app = express()

        var jsonParser = bodyParser.json()


        // Middleware 
        app.use(requestLogger);

        app.get('/', (request, response) => {
            response.send('<h1> Hello world! </h1>')
        })

        app.get('/api/users/:id', (request, response) => {
            const id = request.params.id
            database.getUser(id)
                .then(user => {
                    httpResponse[httpStatus.OK](response, user)
                })
                .catch(err => {
                    httpResponse[httpStatus.NOT_FOUND](response, err)
                })
        })

        app.put('/api/users/:id', jsonParser, (request, response) => {
            const id = request.params.id
            const update = request.body
            database.updateUser(id, update)
                .then((updatedUser) => {
                    httpResponse[httpStatus.OK](response, updatedUser)
                })
                .catch(err => {
                    httpResponse[httpStatus.CONFLICT](response, err)
                })
        })

        app.delete('/api/users/:id', (request, response) => {
            const id = request.params.id
            database.deleteUser(id)
                .then(() => {
                    httpResponse[httpStatus.NO_CONTENT](response)
                })
                .catch(err => {
                    httpResponse[httpStatus.CONFLICT](response, err)
                })
        })

        app.get('/api/users', (request, response) => {
            database.getUsers()
                .then(users => {
                    response.json(users)
                })
                .catch(err => {
                    httpResponse[httpStatus.NOT_FOUND](response, err)
                })
        })

        app.post('/api/users', jsonParser, (request, response) => {
            const user = request.body

            if (!user.name) {
                return httpResponse[httpStatus.BAD_REQUEST](response, "required 'name' field is missing")
            }
            if (!user.username) {
                return httpResponse[httpStatus.BAD_REQUEST](response, "required 'username' field is missing")
            }
            if (!user.password) {
                return httpResponse[httpStatus.BAD_REQUEST](response, "required 'password' field is missing")
            }

            database.addUser(user)
                .then((savedUser) => {
                    httpResponse[httpStatus.CREATED](response, savedUser)
                })
                .catch(err => {
                    httpResponse[httpStatus.CONFLICT](response, err.message)
                })
        })

        // Middleware 
        app.use((request, response) => httpResponse[httpStatus.NOT_FOUND](response))

        const PORT = process.env.SERVER_PORT || 3001
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`)
        })

    }).catch((err) => {
        logger.error(err)
    })