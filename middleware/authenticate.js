const user = require('../DB/user_schema')
const jwt = require("jsonwebtoken")


const auth = (req,res,next){
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new Error("Invalid authorization")
    }
    const token = authHeader.split(' ')[1]
// try catch bcoz may be after bearer they wont be any space
    try{
       const payload = jwt.verify(token,process.env.JWT_SECRET)
       req.user = {name:payload.name}
       next()
    }catch(e){
        throw new Error(e)
    }
}