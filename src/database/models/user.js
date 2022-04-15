const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
    name: String,
    username: String,
    password: { type: String, select: false }
})

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

UserSchema.pre('save', function(next) {
    let self = this;
    let User = model('User', UserSchema)
    User.find({ username: self.username }, function(err, docs) {
        if (!docs.length) {
            next();
        } else {
            next(new Error(`User '${self.username}' already exists`))
        }
    });
})

const User = model('User', UserSchema)

module.exports = User