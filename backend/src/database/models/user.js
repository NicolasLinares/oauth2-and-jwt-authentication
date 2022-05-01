const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
    login: { type: String },
    name: { type: String },
    password: { type: String, select: false },
    github_id: { type: Number},
    github_login: { type: String },
    github_name: { type: String },
    github_email: { type: String }
})

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

UserSchema.pre('save', function(next) {
    let user = this;
    let User = model('User', UserSchema)

    let paramToCheck = undefined
    let errorMessage = undefined
    if (user.github_login) {
        paramToCheck = { github_login: user.github_login }
        errorMessage = new Error(`User ${user.github_login} already exists`)
    }

    if (user.login) {
        paramToCheck = { login: user.login }
        errorMessage = new Error(`User ${user.login} already exists`)
    }

    if (!paramToCheck) {
        next(new Error("An error ocurred during user fields validation before saving in database"))
    }

    User.find(paramToCheck, function(err, docs) {
        if (!docs.length) {
            next();
        } else {
            next(errorMessage)
        }
    });
})

UserSchema.pre('findOneAndUpdate', function(next) {
    this.options.runValidators = true;
    next();
});

const User = model('User', UserSchema)

module.exports = User