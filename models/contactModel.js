
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ContactSchema = new Schema({
    "Name": {
        type: String,
        required: true
    },
    "Email": {
        type: String,
        unique: true,
        required: true
    },
    "Phone": {
        type: String
    },
    "Address": {
        type: String
    },
    
});

module.exports = mongoose.model("Contacts", ContactSchema);