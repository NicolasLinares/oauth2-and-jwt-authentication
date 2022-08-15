const express = require("express")
const router = express.Router()

const authApi = require("./auth")
const usersApi = require("./users")

router.use(authApi)
router.use(usersApi)

module.exports = router
