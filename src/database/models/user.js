const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    name: String,
    username: String,
    password: { type: String, select: false }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const User = model('User', userSchema)

module.exports = User