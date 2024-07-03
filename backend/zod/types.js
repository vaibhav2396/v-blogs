const zod = require("zod")

const createUser = zod.object({
    firstName: zod.string().min(1),
    lastName: zod.string().min(1),
    userName: zod.string().min(1),
    email: zod.string().email(),
    password: zod.string().min(6)
})

const createPost = zod.object({
    title: zod.string().min(1),
    content: zod.string().min(1),
})

module.exports = {
    createUser,
    createPost
}