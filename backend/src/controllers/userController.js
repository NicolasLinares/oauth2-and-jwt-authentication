function UserController() {

    const CONST = require("../utils/constants")
    var httpResponse = require("../utils/responses")
    const userManager = require("../managers/userManager")    

    this.getUserById = (request, response) => {
        const id = request.params.id
        const providerId = request.query?.providerId

        userManager.getUserById(id)
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
        userManager.deleteUserById(id)
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

const userController = new UserController()

module.exports = userController