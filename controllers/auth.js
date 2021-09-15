//Paquetes
const {response,request} = require('express');
const bcryptjs = require('bcryptjs');

//Propios
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');


const login = async (req = request, res = response) =>{

    const {correo,password} = req.body;


    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo});

        if(!usuario)
        {
            return res.status(400).json({
                msg:'usuario/password no son correctos - correo'
            });
        }

        //verificar si el usuario esta activo
        if(usuario.estado === false)
        {
            return res.status(400).json({
                msg:'usuario/password no son correctos - estado:false'
            });
        }

        //verificar la contrasena
        const validPassword =bcryptjs.compareSync(password,usuario.password);

        if(!validPassword){
            return res.status(400).json({
                msg:'usuario/password no son correctos - password'
            });
        }

        //generar el JWT
        const token = await generarJWT(usuario.id);


        


        res.json({
            usuario,
            token
        })
        
    } 
    catch (error) 
    {
        console.log(error);

        return res.status(500).json({
            msg:'Hable con el administrador'
        })
        
    }
}


module.exports = {
    login
}

