const { response, request } = require("express");
const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true }).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  //validar id
  const idValido = await Usuario.findOne({ id });
  if (idValido) {
    throw new Error(`El id ${id} no existe`);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.status(400).json({
    msg: "put API",
    usuario,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre,apellido, correo, password } = req.body;
  const usuario = new Usuario({ nombre,apellido, correo, password });

  //encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //guardar en db
  await usuario.save();

  res.status(201).json({
    usuario,
  });

  console.log(usuario);
};

const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const usuarioAuth = req.usuario;

  // Utiliza findByIdAndUpdate para buscar por el campo _id
  const usuarioEliminadoLog = await Usuario.findByIdAndUpdate(id, {estado: false});

  res.json({
    msg: "delete API",
    usuarioEliminadoLog,
    usuarioAuth,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
  usuariosPost,
};
