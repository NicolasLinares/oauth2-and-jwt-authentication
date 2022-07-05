
import axios from "axios"
import { useNavigate } from "react-router-dom"

import { CONST } from "config"


export const registerUser = async (credentials) => {

    if (!credentials.fullname) {
        throw Error("Your full name is required")
    }
    if (!credentials.email) {
        throw Error("Your email address is required")
    }
    if (!credentials.password) {
        throw Error("Password require at least 8 characters")
    }
    if (credentials.password != credentials.passwordConfirmation) {
        throw Error("Password confirmation is not the same")
    }

    delete credentials.passwordConfirmation

    return axios({
        method: "post",
        url: CONST.uri.auth.REGISTER,
        data: credentials,
        headers: { "Content-Type": "application/json" },
    })
}

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

export const startWithOAuth2 = (providerUrl) => {

    let timer = null
    const authWindow = window.open(providerUrl, "_blank", "width: 500px; height: 600px")

    timer = setInterval(() => {

        if (authWindow && authWindow.closed) {
            fetchUser()
                .then((response) => {

                    const {jwt, user} = response.data
                    sessionStorage.setItem("jwt", jwt)
                    sessionStorage.setItem("user", JSON.stringify(user))
                    window.location.href = "/home"
                })
                .catch((error) => {
                    console.error(error)
                })
            timer && clearInterval(timer)
        }
    }, 500)



    function fetchUser () {
        return axios.get(CONST.uri.auth.GET_USER_SESSION, { withCredentials: true })
    }
}





const manageSuccessfulLogin = (data) => {
    console.log("manage: " + data)
}