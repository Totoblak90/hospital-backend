const { response } = require('express');

module.exports = {
    getDoctors: async (req, res = response) => {
        res.status(200).json({
            ok: true,
            msg: 'Get all doctors'
        })
    },
    createDoctor: async (req, res = response) => {
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