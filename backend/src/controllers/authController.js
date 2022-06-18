
const userManager = require("../managers/userManager")
const logger = require("../services/log")
const CONST = require("../utils/constants")
var httpResponse = require("../utils/responses")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

function AuthController() {

    this.getUserSession = (request, response) => {
        let providerUserData = request.user
        userManager.getUserByProviderId(providerUserData.providerUserId)
            .then((fullUserData) => {
                return userManager.updateUserById(fullUserData.id, { updated: Date.now() })
            })
            .then((fullUserData) => {                
                const publicUserInfo = {
                    id: fullUserData.id,
                    fullname: fullUserData.fullname,
                    email: fullUserData.email,
                    providerName: providerUserData.providerName,
                    loginName: providerUserData.loginName,
                    picture: providerUserData.picture,
                    updated: fullUserData.updated,
                    created: fullUserData.created
                }
                logger.info(`User with id "${fullUserData.id}" started session [${request.sessionID}]`)
                response.json(publicUserInfo)
            })
            .catch((error) => {
                logger.error(error)
            })
    }

    this.login = async (request, response) => {
        // TODO: validations
        const { email, password } = request.body

        try {
            const user = await userManager.getUserByEmail(email)
            if (!user) {
                const message = `User '${email}' not found`
                logger.info(`Login rejected. ${message}`)
                return httpResponse[CONST.httpStatus.NOT_FOUND](response, message)
            }

            const isValidPassword = await bcrypt.compare(password, user.password)
            if (!isValidPassword) {
                const message = "Invalid user password"
                logger.info(`Login rejected. ${message}`)
                return httpResponse[CONST.httpStatus.UNAUTHORIZED](response, message)
            }

            const token = jwt.sign({
                email: user.email,
                id: user.id
            }, process.env.TOKEN_SECRET)
            response.header('auth-token', token)
            return httpResponse[CONST.httpStatus.OK](response, user)

        } catch(error) {
            logger.error(error)
            const message = "Imposible to login user"
            return httpResponse[CONST.httpStatus.INTERNAL_ERROR](response, message)
        }
    }

    this.register = (request, response) => {
        // TODO: validations
        const user = request.body
        userManager.createUser(user)
            .then(createdUser => {
                const token = jwt.sign({
                    name: createdUser.fullname,
                    id: createdUser.id
                }, process.env.TOKEN_SECRET)
                
                response.header('auth-token', token)
                return httpResponse[CONST.httpStatus.CREATED](response, createdUser)
            })
            .catch(err => {
                return httpResponse[CONST.httpStatus.BAD_REQUEST](response, err)
            })
    }
}




const authController = new AuthController()

module.exports = authController