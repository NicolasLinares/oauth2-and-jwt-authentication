const { Schema, model, ObjectId } = require("mongoose")

const UserSchema = new Schema({
    id: { type: ObjectId },
    fullname: { type: String },
    password: { type: String, select: false },
    email: { type: String },
})

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

UserSchema.pre('save', function(next) {
    let User = model('User', UserSchema)
    User.find({ email: this.email }, function(err, docs) {
        if (!docs.length) {
            next();
        } else {
            next(new Error(`User with the email [${this.email}] already exists`))
        }
    })
})

UserSchema.pre('findOneAndUpdate', function(next) {
    this.options.runValidators = true
    next()
});

const User = model('User', UserSchema)

module.exports = User
