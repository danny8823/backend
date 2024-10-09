const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const todoRouter = require('./routes/taskRouter');
require('dotenv').config();
const PORT = process.env.PORT || 1000;
const server = express();
const URL = 'mongodb+srv://dannyyoo714:Jesuschrist8823!@todo-db.8x2pz.mongodb.net/todo?retryWrites=true&w=majority&appName=todo-db'

mongoose
    .connect(URL)
    .then(()=>{
        console.log('DB connected..')
    })
    .catch((e)=>{
        console.log(e)
    })

server.use(express.json())

server.use('/',userRouter)
server.user('/',todoRouter)

server.listen(PORT,() => {
    console.log(`Server listening on port: ${PORT}`)
})