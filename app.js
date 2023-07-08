const express = require('express');
const app = express();
require('dotenv').config()
require('express-async-errors');

const route = require('./route/route')

const notFoundHandler = require("./utils/not_found_handler")
const errorHandler = require("./utils/error_handler")

const db = require("./DB/connect")
const auth = require("./route/auth")
const authenticate = require('./middleware/authenticate')
app.use(express.json())
app.use('/api/v1/jobs',authenticate,route)
app.use('/api/v1/auth',auth)
app.use(notFoundHandler)
app.use(errorHandler)
const start = async ()=>{
    await db.connect()
    app.listen(process.env.PORT, console.log(`Application started on the port ${process.env.PORT}`))
}
start()

