const axios = require("axios");
const logger = require("../../../utils/log")
var database= require("../../../database")


function GithubAuthManager() {

    // First: We visit this URL and we get the request token and then GitHub redirect to our redirectPage 
    this.login = (request, response) => {
        let githubLoginURL = getGitHubLoginURL()
        response.redirect(githubLoginURL)

        function getGitHubLoginURL() {
            let githubAuthProviderURL = process.env.GITHUB_AUTH_PROVIDER
            let clientID = process.env.GITHUB_AUTH_CLIENT_ID
            let redirectURI = process.env.CLIENT_OAUTH_REDIRECT_URL
            
            return githubAuthProviderURL
                .replace(/<CLIENT_ID>/, clientID)
                .replace(/<CLIENT_OAUTH_REDIRECT_URL>/, redirectURI)
        }
    }

    // Second: With the request token, client id and client secret we finally get the access token
    this.getAccessToken = (request, response) => {
        let { code } = request.query

        getTokenFromGithub(code)
        .then(getUserFromGithub)
        .then(addUserIfNotExists)
        .then(() => redirectClientToSuccessLogin(response))            
        .catch(errorHandler)
    }

    //#region Auxiliar methods

    function getTokenFromGithub(code) {
        
        let githubRequestTokenURL = getGithubRequestTokenURL(code)

        return axios({
            method: "post",
            // make a post to the Service Provider authentication API, with the client ID, client secret and request token
            url: githubRequestTokenURL,
            headers: {
                accept: "application/json",
            },
        }).then((response) => {
            return response.data.access_token
        })

        function getGithubRequestTokenURL(code) {
            let githubRequestTokenURL = process.env.GITHUB_TOKEN_PROVIDER,
                clientID = process.env.GITHUB_AUTH_CLIENT_ID,
                clientSecret = process.env.GITHUB_AUTH_CLIENT_SECRET
            let authCode = code
            
            return githubRequestTokenURL
                .replace(/<CLIENT_ID>/, clientID)
                .replace(/<CLIENT_SECRET>/, clientSecret)
                .replace(/<CODE>/, authCode)
        }
    }

    function getUserFromGithub(accessToken) {
        return axios({
            method: "get",
            url: "https://api.github.com/user",
            headers: {
                // This header informs the Github API about the API version
                Accept: "application/vnd.github.v3+json",
                // Include the token in the Authorization header
                Authorization: "token " + accessToken,
            },
        }).then((response) => {
            return response.data
        })
    }

    function addUserIfNotExists(user) {
        return database.getGithubUser(user.id)
        .then(existsUser => {
            if (!existsUser) {
                logger.info(`Creating user "${user.login}" from GitHub authorization provider`)
                return database.addGithubUser(user)
            }
        })
    }

    function redirectClientToSuccessLogin(response) {
        let redirectPageURL = process.env.SUCCESSFUL_LOGIN_REDIRECT
        response.redirect(redirectPageURL)
    }

    function redirectClientToFailedLogin(response) {
        let redirectPageURL = process.env.FAILED_LOGIN_REDIRECT
        response.redirect(redirectPageURL)
    }

    function errorHandler(error) {
        logger.error("Error during GitHub authorization: " + error)
        redirectClientToFailedLogin(response)
    }

    //#endregion
}


module.exports = new GithubAuthManager()