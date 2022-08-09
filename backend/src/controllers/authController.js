
const userManager = require("../managers/userManager")
const logger = require("../services/log")
const CONST = require("../utils/constants")
var httpResponse = require("../utils/responses")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const DuplicatedEmailError = require("../utils/CustomErrors")
const generateJWT = require("../utils/jwt")

function AuthController() {

    this.getUserSession = (request, response) => {
        const jwtToken = request.cookies.jwt
        let { id, email, providerId } = jwt.decode(jwtToken)
        let authData = {
            id: id, 
            providerId: providerId
        }
        return httpResponse[CONST.httpStatus.OK](response, { sid : authData })
    }

    this.login = async (request, response) => {
        const { email, password } = request.body

        try {
            const user = await userManager.getUserByEmail(email)
            if (!user) {
                const message = `Email not found`
                logger.info(`Login rejected [${email}]. ${message}`)
                return httpResponse[CONST.httpStatus.NOT_FOUND](response, message)
            }
            const isValidPassword = await bcrypt.compare(password, user.password)
            if (!isValidPassword) {
                const message = "Wrong password"
                logger.info(`Login rejected [${email}]. ${message}`)
                return httpResponse[CONST.httpStatus.UNAUTHORIZED](response, message)
            }

            const token = generateJWT(user.id, user.email)
            response.cookie('jwt', token, { httpOnly: true, maxAge: CONST.maxAgeCookieExpired })
            logger.info(`Session started for user [${user.email}]`)
            
            let authData = {
                id: user.id
            }
            return httpResponse[CONST.httpStatus.OK](response, { sid: authData })
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
            const token = generateJWT(user.id, user.email)
            response.cookie('jwt', token, { httpOnly: true, maxAge: CONST.maxAgeCookieExpired })
            
            let authData = {
                id: createdUser.id, 
                providerId: null
            }
            return httpResponse[CONST.httpStatus.CREATED](response, {sid : authData})
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