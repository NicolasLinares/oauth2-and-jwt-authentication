const express = require("express")
const router = express.Router()
const middlewares = require("../middlewares")
const userController = require("../controllers/userController")

router.get("/users/:id", middlewares.isUserAuthenticated, userController.getUserById)
router.delete("/users/:id", middlewares.isUserAuthenticated, userController.deleteUserById)

module.exports = router
