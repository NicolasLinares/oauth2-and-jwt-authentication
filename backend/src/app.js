require("dotenv").config();
const express = require("express")
const cors = require("cors")
var bodyParser = require("body-parser")
const middlewares = require('./middlewares');

const api = require("./api")
const app = express()
        
        
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(middlewares.requestLogger);

app.use('/api/v1', api);

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

module.exports = app