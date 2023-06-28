

const errorHandler = (err,req,res,next)=>{
  console.log(err.message)
  res.status(400).send(err.message)
}
module.exports = errorHandler