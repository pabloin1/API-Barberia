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
    type: String,
  },
  barberia:{
    type: String,
  }
});

module.exports = mongoose.model("Cita", citaSchema);
