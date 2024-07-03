const {verify, decode} = require("jsonwebtoken")
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const JWT_SECRET = "VT123"

async function authorization(req, res, next){
    const token = req.headers.authorization
    if(!token){
        return res.status(401).json({"error": "unauthorized user"})
    }
    const decodedToken = decode(token, JWT_SECRET)
    if(!decodedToken){
        return res.status(401).json({"error": "unauthorized user"})
    }
    const user = await prisma.user.findUnique({
        where: {
            id: decodedToken.id
        }
    })
    if(!user){
        return res.status(401).json({"error": "unauthorized user"})
    }
    req.user = user
    next()
}

module.exports = {
    authorization
}