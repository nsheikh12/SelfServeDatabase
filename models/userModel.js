
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

module.exports = mongoose.model("Users", UserSchema);