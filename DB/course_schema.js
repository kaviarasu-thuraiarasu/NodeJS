const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    course_name:String,
    fees:Number,
    name:String,
    email:String,
    
})


module.exports = mongoose.model('Course',courseSchema)