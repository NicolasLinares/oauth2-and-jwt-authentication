
const generateJWT = (userId, userEmail, provider = null) => {
    return require("jsonwebtoken").sign({
        id: userId,
        email: userEmail,
        providerId: provider
    }, process.env.TOKEN_SECRET)
}

const decodeJWT = (jwtToken) => {
    return require("jsonwebtoken").decode(jwtToken)
}

module.exports = {
    generateJWT,
    decodeJWT  
}