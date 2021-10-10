
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ReportIssueSchema = new Schema({
    "firstName": {
        type: String,
        required: true
    },
    "lastName": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        unique: true,
        required: true
    },
    "id": {
        type: Number,
        unique: true,
        required: true
    },
    "phone": {
        type: String
    },
    "userType": {
        type: String
    },
    "preferredContact": {
        type: String
    },
    "availability": {
        type: String
    },
    "subject": {
        type: String,
        required: true
    },
    "problemDescription": {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("ReportIssueTickets", ReportIssueSchema);