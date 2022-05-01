function AuthController() {


    this.oauth2 = {
        github: require("./oauth2/github"),
        google: require("./oauth2/google"),
    }

    this.jwt = {}
}

const authController = new AuthController()

module.exports = authController