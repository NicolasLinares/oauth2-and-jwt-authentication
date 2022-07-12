
const userManager = require("../managers/userManager")
const logger = require("../services/log")
const CONST = require("../utils/constants")
var httpResponse = require("../utils/responses")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const DuplicatedEmailError = require("../utils/CustomErrors")

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

                const body = {
                    jwt: generateJWT(publicUserInfo),
                    user: publicUserInfo
                }

                logger.info(`Session started for user [${publicUserInfo.email}]`)
                return httpResponse[CONST.httpStatus.OK](response, body)
            })
            .catch((error) => {
                const message = `Imposible to get user session: ${error}`
                logger.error(message)
                return httpResponse[CONST.httpStatus.INTERNAL_ERROR](response, message)
            })
    }

    this.login = async (request, response) => {
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

            const body = {
                jwt: generateJWT(user),
                user: user
            }

            logger.info(`Session started for user [${user.email}]`)
            return httpResponse[CONST.httpStatus.OK](response, body)
        } catch(error) {
            const message = `Imposible to login user: ${error}`
            logger.error(message)
            return httpResponse[CONST.httpStatus.INTERNAL_ERROR](response, message)
        }
    }

    this.register = async (request, response) => {
        const user = request.body

        try {
            const createdUser = await userManager.createUser(user)
            const body = {
                jwt: generateJWT(createdUser),
                user: createdUser
            }
            return httpResponse[CONST.httpStatus.CREATED](response, body)
        } catch(error) {

            // Handled errors
            const errors = handleRegisterValidationErrors(error)
            if (errors) {
                return httpResponse[CONST.httpStatus.BAD_REQUEST](response, errors)
            }

            logger.error(error)
            const message = "Imposible to register user"
            return httpResponse[CONST.httpStatus.INTERNAL_ERROR](response, message)
        }
    }


    const generateJWT = (user) => {
        return jwt.sign({
            email: user.email,
            id: user.id
        }, process.env.TOKEN_SECRET)
    }


    const handleRegisterValidationErrors = (err) => {
        let errors = {
            email: "",
            password: "",
            fullname: ""
        }
    
        if (err instanceof DuplicatedEmailError || err.code === 11000) {
            errors.email = "That email is already registered"
            return errors
        }
    
        // Validations error
        if (err.message.includes("User validation failed")) {
            Object.values(err.errors).forEach(({properties}) => {
                errors[properties.path] = properties.message
            })
        }
    
        return errors
    }

}




const authController = new AuthController()

module.exports = authController