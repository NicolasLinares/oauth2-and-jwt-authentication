const { Schema, model, Types } = require("mongoose")

const ExternalUserSchema = new Schema({
    id: { type: Types.ObjectId },
    userId: { type: Types.ObjectId },
    providerUserId: { type: String},
    providerName: { type: String },
    loginName: { type: String },
    picture: { type: String }
})

ExternalUserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

ExternalUserSchema.pre('save', function(next) {
    let ExternalUser = model('ExternalUser', ExternalUserSchema)

    ExternalUser.find({userId: this.userId, providerName: this.providerName}, function(err, docs) {
        if (!docs.length) {
            next();
        } else {
            next(new Error(`User from ${this.providerName} provider already exists`))
        }
    });
})

ExternalUserSchema.pre('findOneAndUpdate', function(next) {
    this.options.runValidators = true
    next()
});

const ExternalUser = model('ExternalUser', ExternalUserSchema)

module.exports = ExternalUser