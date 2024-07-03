const express = require("express")
const { authorization } = require("../middlewares/auth")
const { PrismaClient } = require('@prisma/client')
const { createPost } = require("../zod/types")
const prisma = new PrismaClient()
const blogRouter = express()

blogRouter.post('/',authorization,async (req, res) =>{
    const body = req.body
    const {success} = createPost.safeParse(body)
    if(!success){
        return res.status(402).json({"error": "Incomplete Data"})
    }
    try{
        const response = await prisma.post.create({
            data: {              
                title: body.title,         
                content: body.content,       
                publishedDate: new Date(), 
                author: {
                    connect: {id: req.user.id }
                }      
            }
        })
        return res.json({"post": response})
    }catch(e){
        console.log(e)
        return res.status(402).json({"error": "Error while creating blog"})
    }
})

blogRouter.get('/',authorization,async (req, res) =>{
    try{
        const response = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                publishedDate: true,
                author: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            }
        })
        return res.json({"posts": response})

    }catch(e){
        return res.status(401).json({"error": "Error while fetching blogs"})
    }
})

blogRouter.get('/:id',authorization,async (req, res) =>{
    try{
        const response = await prisma.post.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            select: {
                title: true,
                content: true,
                publishedDate: true,
                author: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            }
        })
        return res.json({"post": response})

    }catch(e){
        return res.status(402).json({"error": "Error while fetching blog"})
    }
})

module.exports = {
    blogRouter
}