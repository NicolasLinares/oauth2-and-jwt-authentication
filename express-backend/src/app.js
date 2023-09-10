const express = require("express")
const cors = require("cors")
const passport = require("passport")
const cookieParser = require("cookie-parser")

var bodyParser = require("body-parser")
const middlewares = require("./middlewares")

const routes = require("./routes")
const app = express()

const frontUri = `http://${process.env.FRONT_HOST}:${process.env.FRONT_PORT}`

app.use(cors({ origin: frontUri, credentials: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())


app.use(middlewares.requestLogger)
app.use("/api/v1", routes)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)



module.exports = app