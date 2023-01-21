const mongoose = require('mongoose');
var StudentSchema = new mongoose.Schema({
    name:String,
    roll_no:Number,
    mobile_no:String,
    class_id:String
});
  
module.exports = mongoose.model('student',StudentSchema);