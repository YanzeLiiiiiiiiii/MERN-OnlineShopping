//insert some samples data into db
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const users = require('./data/user')
const products = require('./data/products')
const User = require('./models/userModel')
const Product = require('./models/productModel')
const Order = require('./models/orderModule')
const connectMongoDB = require('./config/db')

dotenv.config({ path: '../.env' })
connectMongoDB()

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createUsers = await User.insertMany(users)
        const adminUser = createUsers[0]._id
        const sampleProducts = products.map(item => {
            return { ...item, user: adminUser }
        })

        await Product.insertMany(sampleProducts)
        process.exit()
    }

    catch (error) {
        console.log(error)
        process.exit(1)
    }
}


const deletData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        process.exit()
    } catch (error) {

        console.log(error)

        process.exit(1)
    }
}

if (process.argv[2] === '-i') {
    importData()
} else {
    deletData()
}