const jobSchema     = require('../DB/jobs_schema')
const {StatusCodes} = require('http-status-codes')
const asyncWrapper  = require('../utils/asyncWrapper')


const create = asyncWrapper(async (req,res)=>{
    console.log(req.user.id)
       req.body.createdBy   = req.user.id;
       const job            = await jobSchema.create(req.body)
       res.status(StatusCodes.CREATED).json({job})
})

const update = ()=>{}
const remove = async (req,res)=>{
    await jobSchema.deleteOne({_id: req.params.id})
    res.send("Deleted Successfully")
}
const getAll = async (req,res)=>{
    const jobs = await jobSchema.find({createdBy: req.user.id}).sort('createdAt')
    res.send({jobs:jobs,count:jobs.length})
}

const get = async (req,res)=>{
    const {user:{id},params:{jobId:jid}} = req // Nested Destructuring
    console.log(user, params.jid)
    res.send("Get values by ID")
}


const updateById = async (req,res)=>{

    const data = await courseSchema.findByIdAndUpdate({_id: req.params.id},req.body,{new:true,runValidators:true})
    res.send(data)
}

module.exports = {
    create,
    update,
    remove,
    getAll,
    updateById,get
}