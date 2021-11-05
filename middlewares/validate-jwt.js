const jwt = require('jsonwebtoken')

module.exports = {
    validateJWT: (req, res, next) => {
        const token = req.header('x-token');

        if (!token) {
            res.status(401).json({
                ok: false,
                msg: 'No token provided'
            })
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET_KEY);
            next();
        } catch (error) {

            res.status(401).json({
                ok: false,
                msg: 'Invalid token provided'
            })
        }
    }
}