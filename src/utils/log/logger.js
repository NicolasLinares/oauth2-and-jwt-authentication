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

module.exports = Logger