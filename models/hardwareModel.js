
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var HardwareSchema = new Schema({
    "equipmentName": {
        type: String,
        required: true
    },
    "quantity": {
        type: Number,
        required: true
    },
    "icon": {
        type: String
    }
});

module.exports = mongoose.model("Hardware", HardwareSchema);