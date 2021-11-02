/** Routes from api/users */

const { Router } = require('express');
const router = Router();
const { getUsers, createUser } = require('../controllers/users')
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields')

router.get('/', getUsers );
router.post('/',
    [
        check('fullName', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields
    ],
    createUser );


module.exports = router;
