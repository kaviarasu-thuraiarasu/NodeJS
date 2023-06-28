const courseSchema = require('../DB/course_schema')
const asyncWrapper = require('../utils/asyncWrapper')
const create = asyncWrapper(async (req,res)=>{
        const {course_name} = await courseSchema.create(req.body)
        res.send(course_name)
})

const update = ()=>{}
const remove = async (req,res)=>{
    await courseSchema.deleteOne({_id: req.params.id})
    res.send("Deleted Successfully")
}
const getAll = (req,res)=>{
    res.send("Get All Method values")
}

const get = (req,res)=>{
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