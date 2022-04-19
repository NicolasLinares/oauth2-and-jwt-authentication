const axios = require("axios");
const logger = require("../../../utils/log")

// First: We visit this URL and we get the request token and then GitHub redirect to our redirectPage 
const getGitHubLoginURL = () => {
    let authProviderURL = process.env.GITHUB_AUTH_PROVIDER,
        clientID = process.env.GITHUB_AUTH_CLIENT_ID
    let host = process.env.SERVER_HOST,
        port = process.env.PORT,
        hostRedirectEndpoint = process.env.OAUTH_REDIRECT_ENDPOINT
    let redirectURI = `http://${host}:${port}${hostRedirectEndpoint}`

    return `${authProviderURL}/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`
}

// Second: With the request token, cliend id and client secret we finally get the access token
var GitHub_OAuth2 = (request, response) => {
    let authProviderURL = process.env.GITHUB_AUTH_PROVIDER,
        clientID = process.env.GITHUB_AUTH_CLIENT_ID,
        clientSecret = process.env.GITHUB_AUTH_CLIENT_SECRET,
        redirectPage = process.env.OAUTH_REDIRECT_PAGE
    let requestToken = request.query.code

    axios({
        method: "post",
        // make a post to the Service Provider authentication API, with the client ID, client secret and request token
        url: `${authProviderURL}access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
        headers: {
            accept: "application/json",
        },
    }).then((res) => {
        let accessToken = res.data.access_token
        response.redirect(`${redirectPage}?access_token=${accessToken}`)
    }).catch(error => {
        logger.error(error)
    })
}

module.exports = GitHub_OAuth2