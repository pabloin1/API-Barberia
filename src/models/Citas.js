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
  barberia:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'barberia'
  }
});

module.exports = mongoose.model("Cita", citaSchema);
