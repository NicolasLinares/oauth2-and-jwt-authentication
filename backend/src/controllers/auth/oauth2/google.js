const axios = require("axios");
const logger = require("../../../utils/log")
const { google } = require('googleapis');


const getGoogleAuthURL = () => {
    /*
     * Generate a url that asks permissions to the user's email and profile
     */
    const scopes = [
        'https://www.googleapis.com/auth/contacts.readonly',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
    ];
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_AUTH_CLIENT_ID,
        process.env.GOOGLE_AUTH_CLIENT_SECRET,
        process.env.OAUTH_REDIRECT_PAGE
    );
    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes, // If you only need one scope you can pass it as string
    });
}

async function getGoogleUser({ code }) {
    const { tokens } = await oauth2Client.getToken(code);

    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
        .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`, {
                headers: {
                    Authorization: `Bearer ${tokens.id_token}`,
                },
            },
        )
        .then(res => res.data)
        .catch(error => {
            throw new Error(error.message);
        });

    return googleUser;
}


const Google_OAuth2 = (request, response) => {

    google.options({ auth: oauth2Client });

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });

    let requestToken = request.query.code;
    axios({
        method: "post",
        // make a post to the Service Provider authentication API, with the client ID, client secret and request token
        url: `${authProviderURL}access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
        headers: {
            accept: "application/json",
        },
    }).then((res) => {
        let accessToken = res.data.access_token
        response.redirect(`/welcome.html?access_token=${accessToken}`)
    }).catch(error => {
        logger.error(error)
    })
}

module.exports = Google_OAuth2