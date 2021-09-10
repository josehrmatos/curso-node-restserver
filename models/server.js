const express = require('express');
const cors = require('cors'); 
require('dotenv').config();


class Server{

    constructor(){

        this.app =  express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Midlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    middlewares(){

        this.app.use(cors());

        //Parseo y lectura del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }


    routes(){

        this.app.use( this.usuariosPath,require('../routes/usuarios'));
        
    }

    listen(){

        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en el puerto',this.port);
        });
    }


    
}

module.exports = Server;