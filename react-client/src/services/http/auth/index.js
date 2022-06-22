
import axios from "axios"

import { CONST } from "config"

export const startWithCredentials = async (credentials) => {
    if (!credentials.email) {
        throw "Email cannot be null or undefined"
    }
    if (!credentials.password) {
        throw "Password cannot be null or undefined"
    }

    return axios({
        method: "post",
        url: CONST.uri.auth.CREDENTIALS_LOGIN,
        data: credentials,
        headers: { "Content-Type": "application/json" },
    })
}

export const startWithOAuth2 = (providerUrl, callback) => {

    let timer = null
    const authWindow = window.open(providerUrl, "_blank", "width: 500px; height: 600px")

    timer = setInterval(() => {

        if (authWindow && authWindow.closed) {
            callback()
            timer && clearInterval(timer)
        }
    }, 500)
}