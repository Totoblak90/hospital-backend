const { validationResult } = require('express-validator');

module.exports = {
    validateFields: (req, res, next) => {
        
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({
                ok: false,
                msg: errors.mapped()
            })
        }

        next();
    }
}