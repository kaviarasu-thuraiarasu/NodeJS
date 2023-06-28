const express = require('express');
const route = express.Router();
const {login,register} = require('../conroller/auth')
route.route('/login').get(login)
route.route('/register').post(register)
module.exports = route
