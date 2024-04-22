const mongoose = require('mongoose')

const connectMongoDB = async () => {
    MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://ryan:ryan123@cluster0.6itus3f.mongodb.net/onlineshopping?retryWrites=true&w=majority&appName=Cluster0'
    try {
        const connect = await mongoose.connect(MONGO_URI)
        console.log(`Mongo connected:${connect.connection.host}`)

    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = connectMongoDB
