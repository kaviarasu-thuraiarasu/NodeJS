const jobSchema     = require('../DB/jobs_schema')
const {StatusCodes} = require('http-status-codes')
const asyncWrapper  = require('../utils/asyncWrapper')


const create = asyncWrapper(async (req,res)=>{
      
       req.body.createdBy   = req.user.id;
       const job            = await jobSchema.create(req.body)
       res.status(StatusCodes.CREATED).json({job})
})

const update = ()=>{}
const remove = async (req,res)=>{
    
    const {user:{id},params:{jobId:jid}} = req // Nested Destructuring
    const job = await jobSchema.findOneAndRemove({ _id:jid,createdBy:id})
    if(!job){
        throw new Error("Job ID Not matching")
    }
    res.send("Deleted Successfully")
}
const getAll = async (req,res)=>{
    const jobs = await jobSchema.find({createdBy: req.user.id}).sort('createdAt')
    res.send({jobs:jobs,count:jobs.length})
}

const get = async (req,res)=>{
    console.log(req.user,"*******",req.params)
    const {user:{id},params:{jobId:jid}} = req // Nested Destructuring
    console.log(id,"====", jid)

    const job = await jobSchema.findOne({
        _id:jid,createdBy:id
    })
    if(!job){
        throw new Error("Job ID Not matching")
    }
    res.send(job)
}


const updateById = async (req,res)=>{

    // Nested Destructuring
    const {body:{company,position},params:{jobId},user:{id}} = req
    if(company=='' || position==''){
        throw new Error("Company and position field should not be empty")
    }
    const job = await jobSchema.findByIdAndUpdate({_id: jobId},req.body,{new:true,runValidators:true})
    if(!job){
        throw new Error("Job ID Not matching")
    }
    res.send(job)

}

module.exports = {
    create,
    update,
    remove,
    getAll,
    updateById,get
}