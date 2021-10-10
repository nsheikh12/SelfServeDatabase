
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    "submittedBy": {
        type: String,
        required: true
    },
    "articleNumber": {
        type: String,
        unique: true,
        required: true
    },
    "requestingPerson": {
        type: String
    },
    "createdOn": {
        type: Date
    },
    "category": {
        type: String
    },
    "status": {
        type: String
    },
    "assignedTo": {
        type: String
    },
    "articleTitle": {
        type: String,
        required: true
    },
    "body": {
        type: String
    }
});

module.exports = mongoose.model("Articles", ArticleSchema);