const express = require('express')
const usersRouter = express.Router()
const {createUser, getUserByUsername} = require('../db/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {reqUser, reqAdmin} = require('./Utils')
const {JWT_SECRET} = process.env

usersRouter.post('/register', async (req, res, next) => {
    const {username, password} = req.body
    try {
        const userExist = getUserByUsername(username)
        if(userExist){
            next({
                name: 'UserExistsError',
                message: 'This username already exists'
            })
        }
        const newUser = createUser({username, password})

        const token = jwt.sign({id: user.id, 
            username: username},
            process.env.JWT_SECRET, {
                expiresIn: "1W"
            })
            delete user.password
            res.send({
                user,
                message: "NERDDD",
                token
            })
    } catch (error) {
        console.log(error)
    }
})


module.exports = usersRouter