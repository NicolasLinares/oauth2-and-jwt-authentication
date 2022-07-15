const CONST = require("../utils/constants")
var httpResponse = require("../utils/responses")
const userManager = require("../managers/userManager")

function UserController() {

    this.getUserById = (request, response) => {
        const id = request.params.id
        
        userManager.getUserById(id)
            .then(user => {
                httpResponse[CONST.httpStatus.OK](response, user)
            })
            .catch(err => {
                httpResponse[CONST.httpStatus.NOT_FOUND](response, err)
            })
    }

    this.updateUserById = (request, response) => {
        const id = request.params.id
        const update = request.body
        userManager.updateUser(id, update)
            .then((updatedUser) => {
                httpResponse[CONST.httpStatus.OK](response, updatedUser)
            })
            .catch(err => {
                httpResponse[CONST.httpStatus.CONFLICT](response, err)
            })
    }

    this.deleteUserById = (request, response) => {
        const id = request.params.id
        userManager.deleteUser(id)
            .then(() => {
                httpResponse[CONST.httpStatus.NO_CONTENT](response)
            })
            .catch(err => {
                httpResponse[CONST.httpStatus.CONFLICT](response, err)
            })
    }

    this.getAllUsers = (request, response) => {
        userManager.getAllUsers()
            .then(users => {
                httpResponse[CONST.httpStatus.OK](response, users)
            })
            .catch(err => {
                httpResponse[CONST.httpStatus.NOT_FOUND](response, err)
            })
    }

}

const userController = new UserController()

module.exports = userController