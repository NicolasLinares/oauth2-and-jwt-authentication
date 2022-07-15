
export const env = {
    API_HOST: "http://localhost:3080/api/v1",

}


export const uri = {
    auth: {
        GOOGLE_LOGIN: env.API_HOST + "/login/google",
        GITHUB_LOGIN: env.API_HOST + "/login/github",
        GET_USER_SESSION: env.API_HOST + "/oauth/user",
        CREDENTIALS_LOGIN: env.API_HOST + "/login",
        REGISTER: env.API_HOST + "/register"
    },
    resources: {
        USERS: env.API_HOST + "/users/"
    }
}

export const httpStatus = {
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
}