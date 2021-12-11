
const mongoose = require("mongoose");

const bcrypt = require('bcrypt');  //this is for encrypting the password 
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    "lastName": {
        type: String
    },
    "firstName": {
        type: String
    },
    "id": {
        type: Number,
        required: true
    },
    "email": {
        type: String
    },
    "userName": {
        type: String,
        required: true,
        unique: true
    },
    "password": {
        type: String,
        required: true
    },
    "isAdmin": {
        type: Boolean,
        default: false
    },
    "isFaculty": {
        type: Boolean,
        default: false
    }
});

UserSchema.plugin(passportLocalMongoose);

// This part is for hashing part. 
UserSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if (err)
            return next(err);
        this.password = passwordHash;
        next();
    })
});
UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch)=> {
        if (err)
            return cb(err);
        if (!isMatch) { return cb(null, isMatch); }
        return cb(null, this);

    });
};

module.exports = mongoose.model("Users", UserSchema);