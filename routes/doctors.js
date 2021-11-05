/** Routes from api/doctors */

const { Router } = require('express');
const router = Router();
const { getDoctors, createDoctor, editDoctor, deleteDoctor } = require('../controllers/doctors');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

router.get('/',validateJWT, getDoctors );
router.post('/',
    [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        validateFields
    ],
    createDoctor
);
router.put('/:id', 
    [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        validateFields
    ],
    editDoctor
);
router.delete( "/:id",validateJWT, deleteDoctor );


module.exports = router;
