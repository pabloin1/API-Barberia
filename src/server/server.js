const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../database/configDB");
class Server {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.usuariosRoutes = '/API/usuarios';
    this.authPath = '/API/auth'
    //Conectar a base de datos
    this.conectarDB();


    //middelewares
    this.middelewares();

    //Rutas
    this.routes();
    
  }

  async conectarDB(){
    await dbConnection();
  }

  middelewares() {

    this.app.use(cors());

    //Parseo y lectura del body
    this.app.use(express.json())
    
  }

  routes() {
    this.app.use(this.usuariosRoutes,require('../routes/user'))
    this.app.use(this.authPath,require('../routes/auth'))
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Escuchando en el puerto ${this.port}`)
    );
  }
}

module.exports = Server;
