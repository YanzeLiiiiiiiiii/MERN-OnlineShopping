const express = require('express')
const dotenv = require('dotenv')
const productsRouter = require('./routes/products')
const connectMongoDB = require('./config/db')

dotenv.config({ path: '../.env' })

connectMongoDB()

const port = process.env.PORT || 5000;

const app = express()

app.get('/', (req, res) => {
    res.send('Api is OK')
})

app.use('/products', productsRouter)

app.listen(port, () => {
    console.log('Server start....')
})


