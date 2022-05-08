const database = require("../services/database")
const logger = require("../services/log")

function AuthController() {

    this.getUserSession = (request, response) => {
        response.json(request.user)
    }

    this.findOrCreate = (user) => {

        return database.getUserByEmail(user.email)
            .then(existsUser => {
                if (!existsUser) {
                    let newUser = {
                        fullname: user.name,
                        email: user.email,
                    }
                    logger.info("Creating new user...")
                    return database.addUser(newUser)
                }
                return existsUser
            }).then(savedUser => {
                return database.getExternalUser(savedUser.id, user.provider)
                    .then(existsUser => {
                        if (!existsUser) {
                            let newExternalUser = {
                                userId: savedUser.id,
                                loginName: user.login || "",
                                providerUserId: user.id,
                                providerName: user.provider,
                                picture: user.picture || ""
                            }
                            logger.info("Creating new external user...")
                            return database.addExternalUser(newExternalUser)
                        }
                        return existsUser
                    })
            })
    }
}

const authController = new AuthController()

module.exports = authController