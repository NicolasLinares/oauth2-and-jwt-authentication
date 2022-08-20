function ConsoleLogger() {
    this.level = {
        DEBUG: "debug",
        INFO: "info",
        WARN: "warn",
        ERROR: "error",
        TRACE: "trace"
    }

    this.logger = console

    this.debug = (text) => {
        if (!this.logger) {
            throw "Not implemented"
        }
        let logEntry = buildLogEntry(this.level.DEBUG, text)
        this.logger.debug(logEntry)
    }
    this.info = (text) => {
        if (!this.logger) {
            throw "Not implemented"
        }
        let logEntry = buildLogEntry(this.level.INFO, text)
        this.logger.info(logEntry)
    }
    this.warn = (text) => {
        if (!this.logger) {
            throw "Not implemented"
        }
        let logEntry = buildLogEntry(this.level.WARN, text)
        this.logger.warn(logEntry)
    }
    this.error = (text) => {
        if (!this.logger) {
            throw "Not implemented"
        }
        let logEntry = buildLogEntry(this.level.ERROR, text)
        this.logger.error(logEntry)
    }

    this.trace = (text) => {
        if (!this.logger) {
            throw "Not implemented"
        }
        let logEntry = buildLogEntry(this.level.TRACE, text)
        this.logger.log(logEntry)
    }

    function buildLogEntry (level, text) {
        return `${new Date().toUTCString()} [${level}]: ${text}`
    }
}

module.exports = ConsoleLogger