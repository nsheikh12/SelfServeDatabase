
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var RequestServiceSchema = new Schema({
    "requestingPerson": {
        type: String,
        required: true
    },
    "id": {
        type: Number,
        required: true
    },
    "DateRented": {
        type: String,
        required: true
    },
    "equipment": {
        type: String,
        required: true
    },
    "duration": {
        type: String,
    },
    "program": {
        type: String
    },
    "email": {
        type: String
    },
    "campus": {
        type: String,
    },
    "DateReturned": {
        type: String,
    }
    
});

module.exports = mongoose.model("RequestService", RequestServiceSchema);