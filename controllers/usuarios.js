const {response,request} = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');



const usuariosGet = async (req = request, res = response)=> 
{
    // const {q,nombre = 'No name',apikey,page=1,limit} = req.query;
    const {limite = 5,desde = 0}= req.query;

    const query = {estado : true};


    // const usuarios = await Usuario.find(query)
    // .skip(Number(desde))
    // .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total:total,
        usuarios:usuarios
    })

    // res.json({
    //     msg:'get API - controlador',
    //     q,
    //     nombre,
    //     apikey,
    //     page,
    //     limit
    // })
}

const usuariosPost = async (req, res = response)=> 
{
    
    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});

    //Ecriptar la pass 
    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync(password,salt);

    //Guardar en db
    await usuario.save();

    res.status(201).json({
        msg:'post API',
        usuario
    })
}

const usuariosPut = async (req, res = response)=> 
{
    const {id} = req.params;
    const {_id,password,google,correo,...resto} = req.body;

    if(password){
        //Ecriptar la pass 
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        usuario:usuario
    })
}

const usuariosPatch = (req, res = response)=> 
{
    res.json({
        msg:'patch API'
    })
}

const usuariosDelete = async (req, res = response)=> 
{
    // console.log(req);
    const {id} = req.params;

    // const uid = req.uid;


    //Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

    // const usuarioAutenticado= req.usuario;




    res.json({
        usuario
    })
}



module.exports = {
    usuariosGet : usuariosGet,
    usuariosPost:usuariosPost,
    usuariosPut:usuariosPut,
    usuariosPatch:usuariosPatch,
    usuariosDelete:usuariosDelete
}