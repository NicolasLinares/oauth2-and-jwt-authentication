const LoggerBase = require("./loggerBase")

const ConsoleLogger = new LoggerBase()

ConsoleLogger.debug = (text) => {
    that = ConsoleLogger
    let logEntry = that.buildLogEntry(that.level.DEBUG, text)
    console.debug(logEntry)
}

ConsoleLogger.info = (text) => {
    that = ConsoleLogger
    let logEntry = that.buildLogEntry(that.level.INFO, text)
    console.info(logEntry)
}

ConsoleLogger.warn = (text) => {
    that = ConsoleLogger
    let logEntry = that.buildLogEntry(that.level.WARN, text)
    console.warn(logEntry)
}

ConsoleLogger.error = (text) => {
    that = ConsoleLogger
    let logEntry = that.buildLogEntry(that.level.ERROR, text)
    console.error(logEntry)
}

module.exports = ConsoleLogger