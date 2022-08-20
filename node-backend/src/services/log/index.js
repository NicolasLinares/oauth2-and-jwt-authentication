const Logger = require("./logger")

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

const logger = SingletonLogger.getInstance()

module.exports = logger