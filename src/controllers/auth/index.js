function AuthController() {

    this.oauth2 = {
        github: require("./oauth2/github"),
    }

    this.jwt = {}
}

const authController = new AuthController()

module.exports = authController