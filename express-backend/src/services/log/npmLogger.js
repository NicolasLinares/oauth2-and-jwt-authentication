function NpmLogger() {

    try {
        this.logger = require("npmlog")
    } catch (err) {
        throw "npmlog library not found. Install npmlog: npm i npmlog --save"
    }

    this.http = (text) => {
        checkLoggerState(this.logger)
        this.logger.http(new Date().toUTCString(), text)
    }
    this.info = (text) => {
        checkLoggerState(this.logger)
        this.logger.info(new Date().toUTCString(), text)
    }
    this.warn = (text) => {
        checkLoggerState(this.logger)
        this.logger.warn(new Date().toUTCString(), text)
    }
    this.error = (text) => {
        checkLoggerState(this.logger)
        this.logger.error(new Date().toUTCString(), text)
    }

    this.debug = (text) => {
        checkLoggerState(this.logger)
        this.logger.verbose(new Date().toUTCString(), text)
    }

    this.trace = (text) => {
        checkLoggerState(this.logger)
        this.logger.verbose(new Date().toUTCString(), text)
    }

    function checkLoggerState (logger) {
        if (!logger) {
            throw "An error occurred with npmlog, try to install it again"
        }
    }
}

module.exports = NpmLogger