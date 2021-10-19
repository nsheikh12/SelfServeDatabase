var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var statusSchema = new Schema({
	'statusId' : String,
	'statusSrtDesc' : String
});

module.exports = mongoose.model('status', statusSchema);
