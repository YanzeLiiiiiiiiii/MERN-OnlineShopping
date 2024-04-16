const mongoose = require('mongoose')

const connectMongoDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo connected:${connect.connection.host}`)

    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = connectMongoDB
