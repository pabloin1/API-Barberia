const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const validarJwt = async (req = request, res = response, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      msg: "no hay token",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.llave);

    const usuarioAuth = await Usuario.findById(uid);

    if (!usuarioAuth) {
      return res.json({ msg: "el usuario no existe en DB" });
    }

    if (!usuarioAuth.estado) {
      return res.json({ msg: "el token no es valido - false" });
    }

    req.usuario = usuarioAuth;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      msg: "token no valido",
    });
  }
};

module.exports = {
  validarJwt,
};
