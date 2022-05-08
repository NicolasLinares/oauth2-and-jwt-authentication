const express = require('express');
const router = express.Router();
const middlewares = require("../middlewares")
const userController = require("../controllers/userController")
const authController = require("../controllers/oauthController")


router.get('/auth/user', middlewares.isUserAuthenticated, authController.getUserSession)

router.post('/users', middlewares.isUserAuthenticated, userController.createUser)
router.get('/users', middlewares.isUserAuthenticated, userController.getAllUsers)
router.get('/users/:id', middlewares.isUserAuthenticated, userController.getUserById)
router.put('/users/:id', middlewares.isUserAuthenticated, userController.updateUserById)
router.delete('/users/:id', middlewares.isUserAuthenticated, userController.deleteUserById)

module.exports = router;
