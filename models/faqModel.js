const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var FaqSchema = new Schema({
    
    "category": {
        type: String
    },
    
    "articleTitle": {
        type: String,
        
    },
    "body": {
        type: String,
        
    }
});

module.exports = mongoose.model("Faq", FaqSchema);