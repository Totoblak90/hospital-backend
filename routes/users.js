/** Routes from api/users */

const { Router } = require('express');
const router = Router();
const { getUsers, createUser, updateUser, deleteUser, login } = require('../controllers/users')
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

router.get('/', validateJWT ,getUsers );
router.post('/',
    [
        check('fullName', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields
    ],
    createUser 
);
router.put('/:id', 
[
    validateJWT,
    check('fullName', 'Name is required').not().isEmpty(),
    check('role', 'Role is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    validateFields
],
updateUser
);
router.delete( "/:id", validateJWT, deleteUser );
router.post('/auth/login',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields
    ],
    login
);


module.exports = router;
