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
    }),
    login: asyncHandler(async(req,res) => {
        const {email,password} = req.body

        const user = await User.findOne({email})
        if(!user) {
            throw new Error('Invalid credentials')
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            throw new Error('Invalid credentials')
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            "dannyboy",
            {
                expiresIn:'30d'
            }
        )

        res.json({
            message: 'login successful',
            token: token,
            id: user._id,
            email: user.email,
            username: user.username
        })
    }),
    
}

module.exports = userController;