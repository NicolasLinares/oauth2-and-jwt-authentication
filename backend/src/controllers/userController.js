function UserController(database) {

    this.database = database

    const CONST = require("../utils/constants")
    const httpResponse = require("../utils/responses")

    this.getUserById = (request, response) => {
        const id = request.params.id
        const providerId = request.query?.providerId
        
        this.database.getUserById(id)
            .then(user => {
                let userTransformed = userToDTO(user, providerId)
                httpResponse[CONST.httpStatus.OK](response, userTransformed)
            })
            .catch(err => {
                httpResponse[CONST.httpStatus.NOT_FOUND](response, err)
            })

    }

    this.deleteUserById = (request, response) => {
        const id = request.params.id
        this.database.deleteUserById(id)
            .then(() => {
                httpResponse[CONST.httpStatus.NO_CONTENT](response)
            })
            .catch(err => {
                httpResponse[CONST.httpStatus.CONFLICT](response, err)
            })
    }


    function userToDTO (user, providerId = null) {
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
}


const database = require("../services/database")
const userController = new UserController(database)

module.exports = userController