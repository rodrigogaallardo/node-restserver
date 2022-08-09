const express = require('express')
const cors = require('cors')

class Server {

    constructor (){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'
        
        //Middlewares (funciones que van añadirle otra funcionalidad a mi webserver)
        
        this.middlewares();
        //Rutas de mi aplicaciones
        this.routes();
    }

    middlewares(){

        //Cors
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use (express.json())
        //Directorio Publico
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log ('Servidor corriendo en puerto', process.env.PORT)
        })
    }
}

module.exports = Server;