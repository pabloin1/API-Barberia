const { response, request } = require("express");
const Cita = require("../models/Citas");

exports.obtenerCitas = async (req = request, res = response) => {
  try {
    const citas = await Cita.find();
    res.json({
      citas,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

exports.obtenerCitaUsuario = async (req = request, res = response) => {
  try {
    const citas = await Cita.find({ usuario: req.usuario });
    res.json({
      citas,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

exports.obtenerCitasBarberia = async (req = request, res = response) => {
  try {
    const idBarberia = req.params.id;
    const barberia = await Cita.find({ barberia: idBarberia });

    res.json({
      barberia,
    });
  } catch (error) {}
};

exports.crearCita = async (req = request, res = response) => {
  try {
    const { servicio, horario, barberia } = req.body;
    const cita = new Cita({
      servicio,
      horario,
      usuario: req.usuario,
      barberia,
    });
    await cita.save();
    res.json({
      cita,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

exports.borrarCita = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const cita = await Cita.findByIdAndDelete(id);
    res.json({
      cita,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
