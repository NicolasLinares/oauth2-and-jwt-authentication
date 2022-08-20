
import { env } from "./config"

export const uri = {
    auth: {
        GOOGLE_LOGIN: env.API_SERVER + "/login/google",
        GITHUB_LOGIN: env.API_SERVER + "/login/github",
        GET_USER_SESSION: env.API_SERVER + "/oauth/user",
        CREDENTIALS_LOGIN: env.API_SERVER + "/login",
        REGISTER: env.API_SERVER + "/register"
    },
    resources: {
        USERS: env.API_SERVER + "/users/"
    }
}