const { response } = require('express');
const Doctor = require('../models/doctor')

module.exports = {
    getDoctors: async (req, res = response) => {
        res.status(200).json({
            ok: true,
            msg: 'Get all doctors'
        })
    },
    createDoctor: async (req, res = response) => {
        const uid = req.header('x-uid');

        const newDoctor = new Doctor({
            user: uid,
            ...req.body
        });

        try {

            const savedDoctor = await newDoctor.save();

            res.status(200).json({
                ok: true,
                msg: 'Doctor created',
                savedDoctor
            })
            
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Unexpected Error',
                error
            })
        }



        res.status(200).json({
            ok: true,
            msg: 'Doctor created'
        })
    },
    editDoctor: async (req, res = response) => {
        res.status(200).json({
            ok: true,
            msg: 'Doctor edited'
        })
    },
    deleteDoctor: async (req, res = response) => {
        res.status(200).json({
            ok: true,
            msg: 'Doctor deleted'
        })
    }
}