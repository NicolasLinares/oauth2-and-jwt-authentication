import axios from "axios"
import { CONST } from "config"


export const getUserById = (id, providerId = null) => {
    if (!id) {
        throw "id cannot be null or undefined"
    }

    let uri = CONST.uri.resources.USERS + id

    if (providerId) {
        uri = `${uri}?providerId=${providerId}`
    }

    return axios.get(uri, { withCredentials: true })
}