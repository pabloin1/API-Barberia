const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../database/configDB");
class Server {
  constructor() {
    this.app = express();
    this.port = 4000;
    
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
    this.app.use('/API/usuarios',require('../routes/user'))
    this.app.use('/API/auth',require('../routes/auth'))
    this.app.use('/API/barberia', require('../routes/barberia.routes')) 
    this.app.use('/API/cita', require('../routes/cita.routes'))
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Escuchando en el puerto ${this.port}`)
    );
  }
}

module.exports = Server;
