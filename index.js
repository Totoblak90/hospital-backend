require('dotenv').config();

const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');

// Reference to server
const app = express();
// Enable CORS
app.use( cors() );
// Connect to database
dbConnection();

app.get( "/", (req, res) => {
    res.json({
        ok: true,
        msg: "Server live!"
    })
} );

app.listen(process.env.PORT, () => {
    console.log('Server listening in port ' + process.env.PORT)
});