var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var contactPreferenceSchema = new Schema({
	'contactMEthod' : String,
	'preferDay' : Array,
	'preferTimeBegin' : String,
	'preferTimeEnd' : String
});

module.exports = mongoose.model('contactPreference', contactPreferenceSchema);
