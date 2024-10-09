const express = require('express')
const todoController = require('../controllers/taskController')
const taskController = require('../controllers/taskController')
const todoRouter = express.Router()

todoRouter.post('/api/v1/todo/add', taskController.add)
todoRouter.delete('/api/v1/todo/remove', taskController.remove)


module.exports = todoRouter