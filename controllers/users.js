const { request, response } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = {
    getUsers: async (req = request, res = response) => {

        const users = await User.find({}, 'fullName email google role img')

        res.json({
            ok: true,
            users
        })
    },
    createUser: async (req = request, res = response) => {
        // const { email, password } = req.body 
        // I can use destructuring but wont cause it's not helping me to learn but REMEMBER!!!
        
        try {

            // Check if mail exists.

            const emailExists = await User.findOne({ email: req.body.email });

            if (emailExists) {
                return res.status(400).json({
                    ok: false, 
                    msg: 'Email already exists.'
                })
            } 

            // Create user instace.
            const user = new User(req.body);

            // Hash password
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync( req.body.password, salt );

            await user.save();
    
            res.json({
                ok: true,
                user,
                msg: 'User created'
            })

            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false, 
                msg: 'Unexpected error. Please see logs.'
            })
        }

    }
}