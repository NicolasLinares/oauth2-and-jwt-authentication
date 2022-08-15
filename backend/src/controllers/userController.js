function UserController(database) {

    this.database = database

    const CONST = require("../utils/constants")

    this.getUserById = (request, response) => {
        const id = request.params.id
        const providerId = request.query?.providerId
        
        this.database.getUserById(id)
            .then(user => {
                let dto = userToDTO(user, providerId)
                response.json(dto)
            })
            .catch(err => {
                response.status(CONST.httpStatus.NOT_FOUND).json({ error: err })
            })

    }

    this.deleteUserById = (request, response) => {
        const id = request.params.id
        this.database.deleteUserById(id)
            .then((deletedUser) => {
                let dto = userToDTO(deletedUser)
                response.json(dto)
            })
            .catch(err => {
                response.status(CONST.httpStatus.CONFLICT).json({ error: err })
            })
    }

    //#region Auxiliar methods

    const userToDTO = (user, providerId = null) => {
        if (providerId) {
            let { providers } = user
            let providerInformation = providers.find(p => p.providerUserId === providerId)
            user.picture = providerInformation.picture
            user.login = providerInformation.loginName
        }
        delete user.providers
        delete user.password
        return user
    }

    //#endregion
}


const database = require("../services/database")
const userController = new UserController(database)

module.exports = userController