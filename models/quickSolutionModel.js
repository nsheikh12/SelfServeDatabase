var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var quickSolutionSchema = new Schema({
	'quicksolutionId' : String,
	'topic' : String,
	'solution' : String
});

module.exports = mongoose.model('quickSolution', quickSolutionSchema);
