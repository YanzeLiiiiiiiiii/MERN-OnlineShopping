const express = require('express')
const dotenv = require('dotenv')
const connectMongoDB = require('./config/db')
const cookieParse = require('cookie-parser')

const errorHandler = require('./middleware/errorHandler')
const productsRouter = require('./routes/products')
const userRouter = require('./routes/userRoutes')

dotenv.config({ path: '../.env' })

//start db
connectMongoDB()

const port = process.env.PORT || 5000;

const app = express()

//body middleware 
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

//parse request cookie(jwt)
app.use(cookieParse())

app.get('/', (req, res) => {
    res.send('Api is OK')
})

//route registration
app.use('/products', productsRouter)
app.use('/users', userRouter)

//error handler
app.use(errorHandler.notFound)
app.use(errorHandler.errorHandler)



app.listen(port, () => {
    console.log('Server start....')
})


