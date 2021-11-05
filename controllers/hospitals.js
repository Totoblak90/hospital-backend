const { response } = require('express');
const Hospital = require('../models/hospital');

module.exports = {
    getHospitals: async (req, res = response) => {

        res.status(200).json({
            ok: true,
            msg: 'Get all hospitals'
        })
    },
    createHospital: async (req, res = response) => {
        const uid = req.header('x-uid');

        const newHospital = new Hospital({
            user: uid,
            ...req.body
        });

        try {

            const savedHospital = await newHospital.save();

            res.status(200).json({
                ok: true,
                msg: 'Hospital created',
                savedHospital
            })
            
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Unexpected Error',
                error
            })
        }

    },
    editHospital: async (req, res = response) => {
        res.status(200).json({
            ok: true,
            msg: 'Hospital edited'
        })
    },
    deleteHospital: async (req, res = response) => {
        res.status(200).json({
            ok: true,
            msg: 'Hospital deleted'
        })
    }
}