function MongoDB() {

    const mongoose = require("mongoose")
    const logger = require("../utils/log/")
    const User = require("./models/user")

    const connectionString = process.env.DB_CONNECTION_STRING

    this.connect = () => {
        return mongoose.connect(connectionString)
    }

    this.close = () => {
        mongoose.connection.close();
    }

    this.addUser = (user) => {
        if (!user) {
            throw "user cannot be null or undefined"
        }

        const { name, username, password } = user;

        if (!name || !username || !password) {
            throw "user fields cannot be null or undefined"
        }

        const newUser = new User({
            name: name,
            username: username,
            password: password,
        })

        newUser.save()
            .then((result) => {
                logger.info(`User "${result.username}" succesfully created"`)
                this.close()
            })
            .catch((err) => {
                logger.error(err)
            })
    }

    this.getUsers = () => {
        return User.find({})
            .then((result) => {
                this.close()
                return result
            })
            .catch((err) => {
                logger.error(err)
            })
    }
}

module.exports = MongoDB