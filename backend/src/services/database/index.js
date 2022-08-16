//const UserDatabaseMongoDB = require("./userDatabase.mongodb")
const UserDatabaseMongoDBMock = require("./userDatabase.mongodb.mock")

//const database = new UserDatabaseMongoDB()
const database = new UserDatabaseMongoDBMock()

module.exports = database