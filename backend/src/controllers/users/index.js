const database = require("../../database");
var httpResponse = require("../../utils/responses")
var httpStatus = require("../../utils/constants")

function UserController() {

    this.getUserById = (request, response) => {
        const id = request.params.id
        database.getUser(id)
            .then(user => {
                httpResponse[httpStatus.OK](response, user)
            })
            .catch(err => {
                httpResponse[httpStatus.NOT_FOUND](response, err)
            })
    }

    this.updateUserById = (request, response) => {
        const id = request.params.id
        const update = request.body
        database.updateUser(id, update)
            .then((updatedUser) => {
                httpResponse[httpStatus.OK](response, updatedUser)
            })
            .catch(err => {
                httpResponse[httpStatus.CONFLICT](response, err)
            })
    }

    this.deleteUserById = (request, response) => {
        const id = request.params.id
        database.deleteUser(id)
            .then(() => {
                httpResponse[httpStatus.NO_CONTENT](response)
            })
            .catch(err => {
                httpResponse[httpStatus.CONFLICT](response, err)
            })
    }

    this.getAllUsers = (request, response) => {
        database.getUsers()
            .then(users => {
                httpResponse[httpStatus.OK](response, users)
            })
            .catch(err => {
                httpResponse[httpStatus.NOT_FOUND](response, err)
            })
    }

    this.createUser = (request, response) => {
        const user = request.body

        if (!user.name) {
            return httpResponse[httpStatus.BAD_REQUEST](response, "required 'name' field is missing")
        }
        if (!user.username) {
            return httpResponse[httpStatus.BAD_REQUEST](response, "required 'username' field is missing")
        }
        if (!user.password) {
            return httpResponse[httpStatus.BAD_REQUEST](response, "required 'password' field is missing")
        }

        database.addUser(user)
            .then((savedUser) => {
                httpResponse[httpStatus.CREATED](response, savedUser)
            })
            .catch(err => {
                httpResponse[httpStatus.CONFLICT](response, err.message)
            })
    }

}

const userController = new UserController()

module.exports = userController