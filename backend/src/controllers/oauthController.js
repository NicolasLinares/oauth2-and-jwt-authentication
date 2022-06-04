
const userManager = require("../managers/userManager")
const logger = require("../services/log")

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
}

const authController = new AuthController()

module.exports = authController