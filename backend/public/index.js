const getGitHubLoginURL = () => {
    let authProviderURL = "https://github.com/login/oauth",
        clientID = "c7193bd467702af67d8f"
    let host = "localhost",
        port = "3001",
        hostRedirectEndpoint = "/oauth/redirect"
    let redirectURI = `http://${host}:${port}${hostRedirectEndpoint}`

    return `${authProviderURL}/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`
}



const githubLogin = () => {
    console.log("Login with Github")
    let uri = getGitHubLoginURL()
    window.open(uri)
}


const googleLogin = () => {
    console.log("Login with Google")
}