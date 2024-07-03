const express = require("express")
const { createUser } = require("../zod/types")
const userRouter = express()
const { PrismaClient } = require('@prisma/client')
const { authorization } = require("../middlewares/auth")
const prisma = new PrismaClient()
const {sign} = require("jsonwebtoken")
const JWT_SECRET = "VT123"

userRouter.get('/me', authorization, async (req, res) =>{
    const user = {
        name: req.user.firstName
    }
    try{
        res.json({user})
    }catch(e){
        console.log(e)
    }
})
userRouter.post('/signup', async (req, res) =>{
    const body = req.body
    const { success } = createUser.safeParse(body)
    if(!success){
        return res.status(411).json({"error": "Invalid data"})
    }
    
    try{
        const response = await prisma.user.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                userName: body.userName,
                email: body.email,
                password: body.password
            }
        })  
        res.json(
            {
                token: sign({id: response.id}, JWT_SECRET),
                user: {firstName: response.firstName}
            })
    } catch(e){
        return res.json({"error": "Error while sign up"})
    }
})

userRouter.post('/signin', async (req, res) =>{
    const body = req.body
    try{
        const response = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        })
        if(!response){
            return res.status(201).json({error: "invalid login"})
        } 
        res.json({
            token: sign({id: response.id}, JWT_SECRET),
            user: {
                firstName: response.firstName
            }
        })
    } catch(e){
        return res.json({"error": "Error while sign in"})
    }
})

module.exports = {
    userRouter
}