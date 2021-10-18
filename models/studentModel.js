var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var studentSchema = new Schema({
	'studentNumber' : String,
	'firstName' : String,
	'lastName' : String,
	'dateOfBirth' : Date,
	'schoolEmail' : String,
	'privateEmail' : String,
	'gender' : String,
	'phoneNumber' : String,
	'program' : Array,
	'address' : Object,
	'enrollmentStatus' : String
});

module.exports = mongoose.model('student', studentSchema);
