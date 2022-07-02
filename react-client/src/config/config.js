
export const env = {
    API_HOST: "http://localhost:3080",

}


export const uri = {
    auth: {
        GOOGLE_LOGIN: "http://localhost:3080/api/v1/login/google",
        GITHUB_LOGIN: "http://localhost:3080/api/v1/login/github",
        GET_USER_SESSION: "http://localhost:3080/api/v1/oauth/user",
        CREDENTIALS_LOGIN: "http://localhost:3080/api/v1/login",
        REGISTER: "http://localhost:3080/api/v1/register"
    }
}

export const httpStatus = {
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
}