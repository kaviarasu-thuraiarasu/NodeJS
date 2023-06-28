const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter your name.'],
        minlength:3,
        maxlength:6
    },
    email:{
        type:String,
        required:[true,'Please enter your email.'],
        match:[/^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,'Please enter your valid email.'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please enter your password.'],
        // minlength:3,
        // maxlength:5
    }

})

userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10)
    //'this' refering the current document

    this.password = await bcrypt.hash(this.password,salt)
    next()
    // In latest version of mongo, ne need to use next() and next parameter
})

userSchema.methods.createToken = function(){
    console.log("================",this._id)
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:'1d'})
}

userSchema.methods.comparePassword = async function(password){
    const isMatch = await bcrypt.compare(password,this.password)
    return isMatch
}
module.exports = mongoose.model('User',userSchema)