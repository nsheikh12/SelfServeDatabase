var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var prioritySchema = new Schema({
	'priorityId' : Number,
	'NumberOfPersonAffect' : Number,
	'PriorityDescription' : String
});

module.exports = mongoose.model('priority', prioritySchema);
