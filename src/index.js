const express = require('express')

const app = express()

app.get('/', (request, response) => {
    response.send('<h1> Hello world! </h1>')
    console.log("ha entrado1")

})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})