function LoggerBase() {
    this.level = {
        DEBUG: "debug",
        INFO: "info",
        WARN: "warn",
        ERROR: "error",
        TRACE: "trace"
    }

    this.debug = () => {
        throw "Not implemented"
    }
    this.info = () => {
        throw "Not implemented"
    }
    this.warn = () => {
        throw "Not implemented"
    }
    this.error = () => {
        throw "Not implemented"
    }

    this.trace = () => {
        throw "Not implemented"
    }

    this.buildLogEntry = (level, text) => {
        return `${new Date().toUTCString()} [${level}]: ${text}`;
    }
}

module.exports = LoggerBase