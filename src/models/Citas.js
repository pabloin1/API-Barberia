const mongoose = require("mongoose");

const citaSchema = new mongoose.Schema({
  servicio: {
    type: String,
    require: true,
  },
  horario: {
    type: String,
    require: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuario'
  },
  nombreBarberia:{
    type: String,
    require: true,
  }
});

module.exports = mongoose.model("Cita", citaSchema);
