const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TicketSchema = new Schema({

    "studentID": {
        type: String,
        required: true
    }, 
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
        required: true
    }, 
    "phone": {
        type: String
    }, 
    "deviceID": {
        type: String
    }, 
    "specialCase": {
        type: String
    },
    "file": {
        type: String
    }, 
    "subject": {
        type: String, 
        required: true
    }, 
    "description": {
        type: String, 
        required: true
    },
    "internalComment": {
        type: String
    }, 
    "createOn": {
        type: Date, 
        default: Date.now()
    } ,
    "status":{
        type:String,
        default: "Open"
    },
    "solution":{
        type:String
    },
    "ticketNumber":{
        type:String,
        default: new Date().valueOf()
    }
});

module.exports = mongoose.model("Ticket", TicketSchema);

