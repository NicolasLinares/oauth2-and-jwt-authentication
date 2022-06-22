import axios from "axios"

import { CONST } from "config"

export const fetchUser = async () => {

    const response = await axios.get(CONST.uri.auth.GET_USER_SESSION, { withCredentials: true })
        .catch((error) => {
            console.error(error)
        })

    if (response && response.data) {
        console.log("User: ", response.data)
    }
}

