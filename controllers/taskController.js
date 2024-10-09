const asyncHandler = require('express-async-handler')
const Task = require('../model/Todo')

const taskController = {
    add: asyncHandler(async(req,res) => {
        const { task } = req.body

        const newTask = await Task.create({
            task,
            user: req.user
        })

        res.json({
            newTask
        })
    }),
    remove: asyncHandler(async(req,res) => {
        const {taskId} = req.body

        const taskToDelete = await Task.findByIdAndDelete(taskId)

        res.json({
            message: 'task has been deleted',
            deletedTask: taskToDelete
        })
    })
}

module.exports = taskController