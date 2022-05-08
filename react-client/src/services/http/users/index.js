import axios from "axios"

import { CONST } from "config"

export const fetchUser = async () => {

    const response = await axios.get(CONST.uri.user.AUTH, { withCredentials: true })
        .catch((error) => {
            console.error(error)
        })

    if (response && response.data) {
        console.log("User: ", response.data)
    }
}



export const getUsers = async () => {
    let uri = "http://localhost:3080/api/v1/users"

    const response = await axios.get(uri, { withCredentials: true })
        .catch((error) => {
            console.error(error)
        })

    if (response && response.data) {
        console.log("Data: ", response.data)
    }



}
