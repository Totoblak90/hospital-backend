const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuarioDB.id );


        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const loginGoogle = async (req, res = response) => {
    
    const googleToken = req.body.token

    try {

        const { name, email, picture } =  await googleVerify(googleToken);

        const usuarioDb = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDb) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDb;
            usuario.google = true;
        }
        
        await usuario.save();

        // Generar el TOKEN - JWT
        const JWToken = await generarJWT( usuario.id );

        res.json({
            ok: true,
            JWToken
        })
    } catch (error) {
        
        res.json({
            ok: false,
            msg: "Token inválido",
        })
    }

}


module.exports = {
    login,
    loginGoogle
}
