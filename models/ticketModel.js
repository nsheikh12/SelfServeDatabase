var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ticketSchema = new Schema({
	'ticketID' : String,
	'ticketSubject' : String,
	'ticketDescription' : String,
	'numberOfPersonAffected' : Number,
	'status' : String,
	'isNonITIssue' : Boolean,
	'currentWorkingOn' : String,
	'submitDate' : Date,
	'closedDate' : Date,
	'submittedBy' : String,
	'comment' : Array
});

module.exports = mongoose.model('ticket', ticketSchema);
