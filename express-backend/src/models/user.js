const { Schema, model, ObjectId } = require("mongoose")
const { isEmail } = require("validator")
const logger = require("../services/log")
const bcrypt = require("bcrypt")

const UserSchema = new Schema({
    id: { 
        type: ObjectId
    },
    fullname: { 
        type: String,
        //required: [ true, "Please enter a full name"],
        maxlength: [ 64, "Maximum full name length is 64"]
    },
    password: {
        type: String,
        //required: [ true, "Please enter a password"],
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

UserSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})


UserSchema.pre("save", async function(next) {
    if (this.password) {
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

UserSchema.post("save", function(doc, next) {
    let savedUser = doc
    logger.info(`User with email [${savedUser.email}] succesfully created`)
    next()
})

UserSchema.pre("findOneAndUpdate", function(next) {
    this.options.runValidators = true
    next()
})

const User = model("User", UserSchema)

module.exports = User
