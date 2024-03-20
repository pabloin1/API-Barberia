const mongoose = require("mongoose");

const barberiaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    require: true,
  },
  servicios: {
    type: [String],
    require: true,
  },
  horario: {
    type: [String],
    require: true,
  },
  contacto: {
    type: String,
    require: true,
  },
  reseñas: {
    type: [String],
  },
  createdBy: {
    type: {},
    require: true,
  },
  link:{
    type:String
  }
});

module.exports = mongoose.model("Baberia", barberiaSchema);
