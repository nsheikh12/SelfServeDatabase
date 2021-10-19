var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var contactSchema = new Schema({
	'contactID' : String,
	'firstName' : String,
	'lastName' : String,
	'gender' : String,
	'isApplicant' : Boolean,
	'dateOfBirth' : Date,
	'email' : String,
	'phoneNumber' : String,
	'address' : Array
});

module.exports = mongoose.model('contact', contactSchema);
