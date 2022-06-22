
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
                const token = jwt.sign({
                    email: publicUserInfo.email,
                    id: publicUserInfo.id
                }, process.env.TOKEN_SECRET)
                response.header('auth-token', token)
                logger.info(`Session started for user [${publicUserInfo.email}]`)
                return httpResponse[CONST.httpStatus.OK](response, publicUserInfo)
            })
            .catch((error) => {
                const message = `Imposible to get user session: ${error}`
                logger.error(message)
                return httpResponse[CONST.httpStatus.INTERNAL_ERROR](response, message)
            })
    }

    this.login = async (request, response) => {
        // TODO: validations
        const { email, password } = request.body

        try {
            const user = await userManager.getUserByEmail(email)
            if (!user) {
                const message = `Email not found`
                logger.info(`Login rejected. ${message}`)
                return httpResponse[CONST.httpStatus.NOT_FOUND](response, message)
            }
            const isValidPassword = await bcrypt.compare(password, user.password)
            if (!isValidPassword) {
                const message = "Invalid password"
                logger.info(`Login rejected. ${message}`)
                return httpResponse[CONST.httpStatus.UNAUTHORIZED](response, message)
            }

            const token = jwt.sign({
                email: user.email,
                id: user.id
            }, process.env.TOKEN_SECRET)
            response.header('auth-token', token)

            logger.info(`Session started for user [${user.email}]`)
            return httpResponse[CONST.httpStatus.OK](response, user)
        } catch(error) {
            const message = `Imposible to login user: ${error}`
            logger.error(message)
            return httpResponse[CONST.httpStatus.INTERNAL_ERROR](response, message)
        }
    }

    this.register = async (request, response) => {
        // TODO: validations
        const user = request.body

        try {
            const createdUser = await userManager.createUser(user)

            const token = jwt.sign({
                email: createdUser.email,
                id: createdUser.id
            }, process.env.TOKEN_SECRET)
            response.header('auth-token', token)
            return httpResponse[CONST.httpStatus.CREATED](response, createdUser)
        } catch(error) {
            logger.error(error)
            const message = "Imposible to register user"
            return httpResponse[CONST.httpStatus.INTERNAL_ERROR](response, message)
        }
    }
}




const authController = new AuthController()

module.exports = authController