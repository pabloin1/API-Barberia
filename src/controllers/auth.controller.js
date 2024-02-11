const { response, request } = require("express");
const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generarJWT } = require("../helpers/jwt");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    //verificar email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "correo no existente",
      });
    }

    //usuario activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "usuario no logeado",
      });
    }

    //contraseña
    const validPass = bcryptjs.compareSync(password, usuario.password);
    if (!validPass) {
      return res.status(400).json({
        msg: "contraseña incorrecta",
      });
    }

    //geneara jwt
    const token = await generarJWT(usuario.id);

    res.json({
      msg: "hola",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "Algo salio mal",
    });
  }
};

module.exports = {
  login,
};
