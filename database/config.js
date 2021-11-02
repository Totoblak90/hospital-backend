const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Database online')
    } catch (error) {
        console.log(error)
        throw new Error('Failed to connect to the database')
    }
}

module.exports = {
    dbConnection
}