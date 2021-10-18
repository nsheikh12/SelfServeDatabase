var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var EnrollmentStatusSchema = new Schema({
	'currentStatus' : String,
	'currentProgram' : Array,
	'fromSemester' : Array,
	'toSemester' : Array
});

module.exports = mongoose.model('EnrollmentStatus', EnrollmentStatusSchema);
