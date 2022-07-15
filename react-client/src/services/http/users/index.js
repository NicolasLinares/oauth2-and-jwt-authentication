import axios from "axios"
import { CONST } from "config"


export const getUserById = async (id) => {
    if (!id) {
        throw "id cannot be null or undefined"
    }

    return axios.get(CONST.uri.resources.USERS + id, { withCredentials: true })
}