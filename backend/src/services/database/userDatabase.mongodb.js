function UserDatabaseMongoDB(dbConnectionString) {

    const logger = require("../log")
    const mongoose = require("mongoose")
    const connectionString = dbConnectionString
    const User = require("../../models/user")

    this.connect = () => {

        mongoose.connection.on("error", function (err) {
            logger.error("Database connection error: " + err)
        })

        mongoose.connection.on("disconnected", function () {
            logger.info("Database disconnected")
        })

        process.on("SIGINT", function () {
            mongoose.connection.close(function () {
                logger.info("Database process terminated")
                process.exit(0)
            })
        })

        if (!connectionString) {
            throw new Error("Impossible to connect to MongoDB database: connection string not stabilished")
        }

        return mongoose.connect(connectionString)
    }

    this.close = () => {
        return mongoose.connection.close()
    }


    this.createUser = (user) => {
        if (!user) {
            throw "user cannot be null or undefined"
        }
        const { fullname = "", email, password = "" } = user

        const newUser = new User({
            fullname: fullname,
            email: email,
            password: password,
        })

        return newUser.save()
            .then((savedUser) => {
                return savedUser?.toJSON()
            })
    }

    this.deleteUserById = (id) => {
        if (!id) {
            throw "id cannot be null or undefined"
        }

        return User.findByIdAndDelete(id)
            .then((deletedUser) => {
                if (!deletedUser) {
                    throw "User not found"
                }
                return deletedUser?.toJSON()
            })
    }

    this.getUserById = (id) => {
        if (!id) {
            throw "id cannot be null or undefined"
        }

        return User.findById(id)
            .then((user) => {
                return user?.toJSON()
            })
    }

    this.getUserByEmail = (email) => {
        return User.findOne({ email: email })
            .then((user) => {
                return user?.toJSON()
            })
    }

    this.getUserByProviderId = (providerUserId) => {
        if (!providerUserId) {
            throw "providerUserId cannot be null or undefined"
        }
        return User.findOne({ "providers.providerUserId": providerUserId })
            .then((user) => {
                return user?.toJSON(providerUserId)
            })
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
        let { userId, providerUserId, providerName, loginName = "", picture = "" } = user

        return User.findByIdAndUpdate(userId, {
            $push: {
                providers: {
                    providerUserId: providerUserId,
                    providerName: providerName,
                    loginName: loginName,
                    picture: picture
                }
            }}, {
            new: true
        }
        ).then((savedUser) => {
            return savedUser?.toJSON()
        })
    }

    this.getUsers = () => {
        return User.find({})
            .then((users) => {
                return users
            })
    }
}

module.exports = UserDatabaseMongoDB