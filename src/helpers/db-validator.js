const Usuario = require("../models/Usuario");
const Cita = require("../models/Citas");

exports.emailExiste = async (correo = "") => {
  //verificar correo
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya existe`);
  }
};

exports.idExiste = async (id) => {
  const existeId = await Usuario.findById(id);
  if (!existeId) {
    throw new Error(`El ID: ${id}, no existe`);
  }
};

exports.citaExiste = async (horario) => {
  const existeHorario = await Cita.findOne({ horario });
  if (existeHorario) {
    throw new Error(`La cita con el ${horario} ya existe`);
  }
};