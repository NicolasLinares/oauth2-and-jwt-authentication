
class DuplicatedEmailError extends Error {
    constructor(message) {
        super(message)
        this.name = "DuplicatedEmailError"
    }
}

module.exports = DuplicatedEmailError