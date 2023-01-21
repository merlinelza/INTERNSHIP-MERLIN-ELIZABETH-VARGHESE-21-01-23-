const mongoose = require('mongoose');
var ClassSchema = new mongoose.Schema({
    standard:String,
    division:String
});
  
module.exports = mongoose.model('class',ClassSchema);