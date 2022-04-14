const express = require('express')
const requestLogger = require("./middlewares/requestLogger")
const notFoundResponse = require("./middlewares/404")

const app = express()

// Middleware 
app.use(requestLogger);

app.get('/', (request, response) => {
    response.send('<h1> Hello world! </h1>')
})

// Middleware 
app.use(notFoundResponse)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})