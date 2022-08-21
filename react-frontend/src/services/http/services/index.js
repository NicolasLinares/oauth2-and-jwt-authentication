import axios from "axios"
import { CONST } from "config"


export const isOAuth2GoogleAvailable = () => {
    return axios.get(CONST.uri.services.OAUTH2_GOOGLE_STATUS)
}

export const isOAuth2GithubAvailable = () => {
    return axios.get(CONST.uri.services.OAUTH2_GITHUB_STATUS)
}