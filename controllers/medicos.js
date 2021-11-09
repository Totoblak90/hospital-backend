const { response } = require('express');

const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img')


    res.json({
        ok: true,
        medicos
    })
}

const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });


    try {

        const medicoDB = await medico.save();

        
        res.json({
            ok: true,
            medico: medicoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarMedico = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        
        const medicoDB = await Medico.findById(id)

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado por ese id'
            })
        }

        const medicoActualizado = {
            ...req.body,
            usuario: uid
        }
        
        const medicoGuardado = await Medico.findByIdAndUpdate(id, medicoActualizado, { new: true })
            .populate('hospital', 'nombre')
            .populate('usuario', 'nombre')

        res.json({
            ok: true,
            medico: medicoGuardado
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, comuniquese con el administrador de la página'
        })
    }

}

const borrarMedico = async (req, res = response) => {

    const id = req.params.id;

    try {
        
        const medicoDB = await Medico.findById(id)

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado por ese id'
            })
        }


        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Médico eliminado exitosamente'
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, comuniquese con el administrador de la página'
        })
    }
}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}