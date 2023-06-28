const express = require('express');
const route = express.Router();
const { create,
        update,
        remove,
        getAll,updateById,get} = require('../conroller/controller')


// route.route('/create').get(create)
route.route('/').get(getAll)
route.route('/create').post(create)
route.route('/:jobId').patch(updateById).delete(remove).get(get)
//route.route('/create/:id').delete(remove)

module.exports = route