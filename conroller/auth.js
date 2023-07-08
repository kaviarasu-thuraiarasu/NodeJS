const UserSchema = require('../DB/user_schema')
const {StatusCodes} = require("http-status-codes")
const CustomError = require("../utils/custom_error")
//const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const register =  async (req,res)=>{
   // try{
         const {name,email,password} = req.body
        // const salt = await bcrypt.genSalt(10)
        // const hashedPassword = await bcrypt.hash(password,salt)
        // const tempUser = {name,email,password:hashedPassword}
        // // if(!name || !email || !password){
        // //     const error = new Error("Invalid username")
        // //    // error.message = "Invalid username"
        // //     // next(error) 
        // //     throw new Error("Invalid fsdfdsf username")
        // // }
        // await UserSchema.create(tempUser)
        
        const user = await UserSchema.create(req.body)
        // const token = jwt.sign({ name }, process.env.JWT_SECRET, { expiresIn: '1d' })
        
        // 'user' variable is an document reference
        //const token = user.createToken()
      
        //res.status(StatusCodes.CREATED).send({user,token})
        res.status(StatusCodes.CREATED).send({user})

    // }catch(e)
    // {
    //     next(e.message)
    // }
}

const login = async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        throw new Error("Please enter email and password")
    }
    const user = await UserSchema.findOne({email})
    if(!user){
        throw new Error("UnAuthenticated Access")

    }
    const pwdMatched = await user.comparePassword(password)
   
    if(!pwdMatched){
        throw new Error("UnAuthenticated Access")
    }
    const token = user.createToken()
    res.status(StatusCodes.OK).send({user:{name:user.name},token})

}

module.exports = {
    register: register,
    login: login
}