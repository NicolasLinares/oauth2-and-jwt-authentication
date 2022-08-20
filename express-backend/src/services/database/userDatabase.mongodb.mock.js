function UserDatabaseMongoDBMock() {

    const logger = require("../log")
    const User = require("../../models/user")
    const bcrypt = require("bcrypt")

    let userRepository = {}

    this.connect = () => {
        logger.info("Connecting to mock database...")
        return Promise.resolve()
    }

    this.close = () => {
        logger.info("Disconnecting from mock database...")
        return Promise.resolve()
    }

    this.createUser = async (user) => {
        if (!user) {
            throw "user cannot be null or undefined"
        }
        const { fullname = "", email, password = "" } = user

        const newUser = new User({
            fullname: fullname,
            email: email,
            password: password,
        })

        if (newUser.password) {
            const salt = await bcrypt.genSalt()
            newUser.password = await bcrypt.hash(newUser.password, salt)
        }
        console.log(userRepository)

        userRepository[newUser._id] = newUser
        return Promise.resolve(newUser?.toJSON())
    }

    this.deleteUserById = (id) => {
        if (!id) {
            throw "id cannot be null or undefined"
        }

        let user = userRepository[id]
        delete userRepository[id]
        console.log(userRepository)
        return Promise.resolve(user?.toJSON())
    }

    this.getUserById = (id) => {
        if (!id) {
            throw "id cannot be null or undefined"
        }
        let user = userRepository[id]
        return Promise.resolve(user?.toJSON())
    }

    this.getUserByEmail = (email) => {
        let user = Object.values(userRepository).find(user => user.email === email)
        return Promise.resolve(user?.toJSON())
    }

    this.getUserByProviderId = (providerUserId) => {
        if (!providerUserId) {
            throw "providerUserId cannot be null or undefined"
        }

        let user = Object.values(userRepository).find(user => Object.values(user.providers).find(provider => provider.providerUserId === providerUserId))
        return Promise.resolve(user?.toJSON())
    }

    this.addProviderUser = async (user) => {
        if (!user) {
            throw "user cannot be null or undefined"
        }
        if (!user.userId) {
            throw "userId fields cannot be null or undefined"
        }
        if (!user.providerUserId) {
            throw "providerUserId fields cannot be null or undefined"
        }
        if (!user.providerName) {
            throw "providerName fields cannot be null or undefined"
        }
        let { userId } = user

        userRepository[userId].providers.push(user)
        let userUpdated = userRepository[userId]
        return Promise.resolve(userUpdated?.toJSON())
    }

    this.getUsers = () => {
        let users = Object.values(userRepository)
        users = users.map(user => user?.toJSON())
        return Promise.resolve(users)
    }
}

module.exports = UserDatabaseMongoDBMock