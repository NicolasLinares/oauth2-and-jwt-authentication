const { Schema, model, ObjectId } = require("mongoose")
const { isEmail } = require("validator")
const DuplicatedEmailError = require("../utils/CustomErrors")

const UserSchema = new Schema({
    id: { 
        type: ObjectId
    },
    fullname: { 
        type: String,
        required: [ true, "Please enter a full name"],
        maxlength: [ 64, "Maximum full name length is 64"]
    },
    password: {
        type: String,
        required: [ true, "Please enter a password"],
        maxlength: [ 64, "Maximum password length is 64"]
    },
    email: { 
        type: String,
        unique: true,
        required: [ true, "Please enter an email"],
        lowercase: true,
        maxlength: [ 128, "Maximum password length is 128"],
        validate: [ isEmail, "Please enter a valid email"]
    },
    providers: {
        type : Array,
        default: [] 
    },
    updated: {
        type: Date,
        default: Date.now 
    },
    created: {
        type: Date,
        default: Date.now
    }
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
    let email = this.email
    User.find({ email: email }, function(err, docs) {
        if (!docs.length) {
            next();
        } else {
            next(new DuplicatedEmailError(`User with email [${email}] already exists`))
        }
    })
})

UserSchema.pre('findOneAndUpdate', function(next) {
    this.options.runValidators = true
    next()
});

const User = model('User', UserSchema)

module.exports = User
