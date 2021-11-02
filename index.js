require('dotenv').config();

const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');

// Reference to server
const app = express();

// Enable CORS
app.use( cors() );

// Read and parse body
app.use( express.json() );

// Connect to database
dbConnection();

// Routes
app.use('/api/users', require('./routes/users'));

app.listen(process.env.PORT, () => {
    console.log('Server listening in port ' + process.env.PORT)
});