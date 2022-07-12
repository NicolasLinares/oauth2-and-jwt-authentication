

function UserManager() {

    const database = require("../services/database");
    const logger = require("../services/log")

    this.getUserByEmail = (email) => {
        return database.getUserByEmail(email)
    }

    this.getUserById = (id) => {
        return database.getUserById(id)
    }

    this.getUserByProviderId = (providerUserId) => {
        return database.getUserByProviderId(providerUserId)
    }

    this.updateUserById = (id, jsonData) => {
        return database.updateUser(id, jsonData)
    }

    this.deleteUserById = (id) => {
        return database.deleteUser(id)
    }

    this.getAllUsers = () => {
        return database.getUsers()
    }

    this.createUser = (user) => {
        return database.addUser(user)
    }


    this.findOrCreate = (user) => {
        if (!user.email) {
            throw "required 'email' field is missing"
        }

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
                let { providers } = savedUser

                let existsExternalUser = providers.find(o => o.providerUserId == user.id && o.providerName == user.provider)
                if (!existsExternalUser) {
                    let newExternalUser = {
                        userId: savedUser.id,
                        loginName: user.login || "",
                        providerUserId: user.id,
                        providerName: user.provider,
                        picture: user.picture || ""
                    }
                    logger.info(`Register user with id "${savedUser.id}" from ${user.provider} OAuth 2.0`)
                    return database.addProviderUser(newExternalUser)
                        .then(() => {
                            return newExternalUser
                        })
                }

                return existsExternalUser
            })
    }
}


const userManager = new UserManager()

module.exports = userManager