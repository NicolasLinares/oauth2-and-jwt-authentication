const ConsoleLogger = require("./consoleLogger")

function Logger() {

    const logger = ConsoleLogger

    this.debug = (text) => {
        logger.debug(text)
    }

    this.info = (text) => {
        logger.info(text)
    }

    this.warn = (text) => {
        logger.warn(text)
    }

    this.error = (text) => {
        logger.error(text)
    }
}

class SingletonLogger {
    static _instance

    static _createInstance() {
        return new Logger()
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = this._createInstance()
        }

        return this._instance
    }
}

const logger = SingletonLogger.getInstance();

module.exports = logger