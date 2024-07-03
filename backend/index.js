const express =  require("express")
const { userRouter } = require("./routes/user")
const { blogRouter } = require("./routes/blog")
const cors = require("cors")
const app = express()
app.use(cors())
const port = 3000


app.use(express.json())


app.use('/api/v1/user', userRouter)
app.use('/api/v1/blog', blogRouter)

app.listen(port, ()=>{
    console.log("Server is running on port: "+port)
})