const { request, response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt')

module.exports = {
    getUsers: async (req, res = response) => {

        const users = await User.find({}, 'fullName email google role img')

        res.json({
            ok: true,
            users
        })
    },
    createUser: async (req, res = response) => {
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

            // Generate token

            const token = await generateJWT(user.id)
    
            res.json({
                ok: true,
                user,
                token,
                msg: 'User created'
            })

            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false, 
                msg: 'Unexpected error. Please see logs.'
            })
        }

    },
    updateUser: async (req, res = response) => {
        // TODO: VALIDATE TOKEN AND USER
        
        // UPDATE USER
        const id = req.params.id

        try {

            const dbUser = await User.findById(id);

            if (!dbUser) {
                return res.status(404).json({
                    ok: false,
                    msg: 'User does not exist'
                })
            }

            const { password, google, email, ...fields } = req.body;

            if (dbUser.email !== email) {

                const emailExists = await User.findOne({ email });
                if (emailExists) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Email already exists in our database'
                    })
                }

            }

            fields.email = email;

            const updatedUser = await User.findByIdAndUpdate(id, fields, { new: true });
            
            res.status(200).json({
                ok: true,
                user: updatedUser
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                errorMsg: 'Unknown error',
                error
            }) 
        }

    },
    deleteUser: async (req, res = response) => {

        const id = req.params.id;

        try {

            const dbUser = await User.findById(id);

            if (!dbUser) {
                return res.status(404).json({
                    ok: false,
                    msg: 'User does not exist'
                })
            }

            await User.findByIdAndDelete(id);

            res.status(200).json({
                ok: true,
                msg: 'User succesfully deleted.'
            })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: "Unknown error"
            })
        }

    },
    login: async (req, res = response) => {

        const { email, password } = req.body;

        try {

            const dbUser = await User.findOne({ email })

            if (!dbUser) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Invalid credentials'
                })
            }
            
            const checkPassword = bcrypt.compareSync(password, dbUser.password)

            if (!checkPassword) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Invalid credentials'
                })
            }

            const token = await generateJWT(dbUser.id);

            res.status(200).json({
                ok: true,
                token,
                msg: 'Succesfully authenticated'
            })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: "Unknown Error"
            })
        }

    }
}