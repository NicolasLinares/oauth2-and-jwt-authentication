const database = require("../services/database");
var httpResponse = require("../utils/responses")
const CONST = require("../utils/constants")

function UserController() {

    this.getUserById = (request, response) => {
        const id = request.params.id
        database.getUser(id)
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
        database.updateUser(id, update)
            .then((updatedUser) => {
                httpResponse[CONST.httpStatus.OK](response, updatedUser)
            })
            .catch(err => {
                httpResponse[CONST.httpStatus.CONFLICT](response, err)
            })
    }

    this.deleteUserById = (request, response) => {
        const id = request.params.id
        database.deleteUser(id)
            .then(() => {
                httpResponse[CONST.httpStatus.NO_CONTENT](response)
            })
            .catch(err => {
                httpResponse[CONST.httpStatus.CONFLICT](response, err)
            })
    }

    this.getAllUsers = (request, response) => {
        database.getUsers()
            .then(users => {
                httpResponse[CONST.httpStatus.OK](response, users)
            })
            .catch(err => {
                httpResponse[CONST.httpStatus.NOT_FOUND](response, err)
            })
    }

    this.createUser = (request, response) => {
        const user = request.body

        if (!user.name) {
            return httpResponse[CONST.httpStatus.BAD_REQUEST](response, "required 'name' field is missing")
        }
        if (!user.username) {
            return httpResponse[CONST.httpStatus.BAD_REQUEST](response, "required 'username' field is missing")
        }
        if (!user.password) {
            return httpResponse[CONST.httpStatus.BAD_REQUEST](response, "required 'password' field is missing")
        }

        database.addUser(user)
            .then((savedUser) => {
                httpResponse[CONST.httpStatus.CREATED](response, savedUser)
            })
            .catch(err => {
                httpResponse[CONST.httpStatus.CONFLICT](response, err.message)
            })
    }

}

const userController = new UserController()

module.exports = userController