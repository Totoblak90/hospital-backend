const jwt = require('jsonwebtoken')

module.exports = {
    validateUID: (req, res, next) => {
        const uid = req.header('x-uid');
        
        if (!uid) {
            res.status(401).json({
                ok: false,
                msg: 'No uid provided'
            })
        }

        
        next();
    }
}