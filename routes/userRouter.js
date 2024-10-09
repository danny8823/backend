const express = require('express')
const userController = require('../controllers/userController')
const userRouter = express.Router()

userRouter.post('/api/v1/users/register', userController.register)
userRouter.post('/api/v1/users/login', userController.login)
userRouter.get('/api/v1/users/profile', userController.profile)
userRouter.put('/api/v1/users/change-password', userController.changeUserPassword)
userRouter.put('/api/va/users/edit-profile', userController.updateUserProfile)
module.exports = userRouter