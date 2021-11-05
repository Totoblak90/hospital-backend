const jwt = require('jsonwebtoken')

module.exports = {
    generateJWT: (id) => {
        return new Promise( (resolve, reject) => {

            const payload = id;
    
            jwt.sign(payload, process.env.JWT_SECRET_KEY, {},
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject( err )
                }
                resolve(token);
            })
        })
    }
} 