const Usuario = require("../models/Usuario");


const emailExiste = async (correo = "") => {
  //verificar correo
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya existe`);
  }
};

const idExiste = async (id) => {
  const existeId = await Usuario.findById( id );
  if (!existeId) {
    throw new Error(`El ID: ${id}, no existe`);
  }
};

module.exports = {
  emailExiste,
  idExiste,
};
