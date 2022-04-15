function MongoDB() {

    const mongoose = require("mongoose")
    const logger = require("../utils/log/")
    const User = require("./models/user")

    const connectionString = process.env.DB_CONNECTION_STRING

    this.connect = () => {

        mongoose.connection.on("error", function(err) {
            logger.error("Database connection error: " + err);
        });

        mongoose.connection.on("disconnected", function() {
            logger.info("Database disconnected");
        });

        process.on('SIGINT', function() {
            mongoose.connection.close(function() {
                logger.info('Database process terminated');
                process.exit(0);
            });
        });

        return mongoose.connect(connectionString)
    }

    this.close = () => {
        mongoose.connection.close();
    }

    this.getUser = (id) => {
        if (!id) {
            throw "id cannot be null or undefined"
        }

        return User.findById(id)
            .then((user) => {
                return user
            })
    }

    this.deleteUser = (id) => {
        if (!id) {
            throw "id cannot be null or undefined"
        }

        return User.findByIdAndDelete(id)
            .then((deletedUser) => {
                if (!deletedUser) {
                    throw `User not found`
                }
                logger.info(`User with id "${id}" succesfully deleted`)
                return deletedUser
            })
    }

    this.updateUser = (id, updateFields) => {
        if (!id) {
            throw "id cannot be null or undefined"
        }

        return User.findByIdAndUpdate(id, updateFields, { new: true })
            .then((updatedUser) => {
                logger.info(`User with id "${id}" succesfully updated`)
                return updatedUser
            })
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

        return newUser.save()
            .then((savedUser) => {
                logger.info(`User with id "${savedUser.id}" succesfully created`)
                return savedUser
            })
    }

    this.getUsers = () => {
        return User.find({})
            .then((users) => {
                return users
            })
    }
}

module.exports = MongoDB