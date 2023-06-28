const asyncWrapper = (cb)=>{

    return (req,res,next)=>{
        try{
            cb(req,res,next);
        }catch(error){
            next(error)
        }
    }
}
module.exports = asyncWrapper