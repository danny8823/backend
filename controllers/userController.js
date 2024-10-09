const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/User')

const userController = {
    register: asyncHandler(async(req,res) => {
        const {username, email, password} = req.body;

        if(!username || !email || !password) {
            throw new Error('All fields are required')
        }

        const userExists = await User.findOne({email})
        if(userExists) {
            throw new Error('This email is already registered')
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userCreated = await User.create({
            email,
            username,
            password: hashedPassword
        })

        res.json({
            id: userCreated._id,
            username: userCreated.username,
            email: userCreated.email,
        })
    })
}

module.exports = userController;