
const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    company:{
        type: String,
        required:[true,'Please provide company name'],
        maxLength:7
    },
    position:{
        type: String,
        required:[true,'Please provide position'],
        maxLength:100
    },
    status:{
        type:String,
        enum:{
            values: ['interview','declined','pending'],
            message: 'It is not supported'
          },
        default:'pending',
       // required: [true, 'A tour must have a difficulty'],
        
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide user']
    }

},{timestamps:true})

module.exports = mongoose.model('jobs', jobSchema)