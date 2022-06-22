require("dotenv").config();
const express = require("express")
const cors = require("cors")
const passport = require('passport')
const session = require('express-session');
const cookieParser = require("cookie-parser");

var bodyParser = require("body-parser")
const middlewares = require('./middlewares')

const routes = require("./routes")
const app = express()

        
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false 
}))
app.use(cookieParser());

app.use(passport.initialize())
app.use(passport.session())

app.use(middlewares.requestLogger)

app.use('/api/v1', routes)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)



module.exports = app