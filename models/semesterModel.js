var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var semesterSchema = new Schema({
	'semesterId' : String,
	'semesterName' : String,
	'startDate' : Date,
	'EndDate' : Date
});

module.exports = mongoose.model('semester', semesterSchema);
