const UserDatabaseMongoDBMock = require("./userDatabase.mongodb.mock")
const UserDatabaseMongoDB = require("./userDatabase.mongodb")
const connectionInfo = process.env.DB_CONNECTION_STRING

const database = connectionInfo
    ? new UserDatabaseMongoDB(connectionInfo)
    : new UserDatabaseMongoDBMock()

module.exports = database