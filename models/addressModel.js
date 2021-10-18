var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var addressSchema = new Schema({
	'streetNo' : Number,
	'AptNo' : Number,
	'streetName' : String,
	'city' : String,
	'province_state' : String,
	'country' : String,
	'postalCode' : String
});

module.exports = mongoose.model('address', addressSchema);
