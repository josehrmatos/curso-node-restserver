const Role = require('../models/role');
const usuario = require('../models/usuario');




const esRoleValido = async(rol = '')=> {

    const existeRol = await Role.findOne({rol});

    if(!existeRol){
            throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

//Verificar si el correo existe
const emailExiste = async(correo = '') => {

    const existeEmail = await usuario.findOne({correo:correo});

    if(existeEmail){
        throw new Error(`el correo: ${correo} ya esta registrado`);
    }
}

//Verificar si el correo existe
const existeUsuarioPorId = async(id ) => {

    const existeUsuario = await usuario.findOne({id:id});

    if(!existeUsuario){
        throw new Error(`el id: ${id} no existe`);
    }
}





module.exports={
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}



