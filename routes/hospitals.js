/** Routes from api/hospitals */

const { Router } = require('express');
const router = Router();
const { getHospitals, createHospital, editHospital, deleteHospital } = require('../controllers/hospitals')
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

router.get('/', validateJWT, getHospitals );
router.post('/',
    [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        validateFields
    ],
    createHospital
);
router.put('/:id', 
    [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        validateFields
    ],
    editHospital
);
router.delete( "/:id", validateJWT, deleteHospital );


module.exports = router;
