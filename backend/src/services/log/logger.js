const ConsoleLogger = require("./consoleLogger")
const NpmLogger = require("./npmLogger")

function Logger() {

    //this.log = new ConsoleLogger()

    this.log = new NpmLogger()

    this.http = (text) => {
        this.log.http && this.log.http(text)
    }

    this.debug = (text) => {
        this.log.debug && this.log.debug(text)
    }

    this.info = (text) => {
        this.log.info && this.log.info(text)
    }

    this.error = (text) => {
        this.log.error && this.log.error(text)
    }

    this.warn = (text) => {
        this.log.warn && this.log.warn(text)
    }

    this.trace = (text) => {
        this.log.trace && this.log.trace(text)
    }
}

module.exports = Logger