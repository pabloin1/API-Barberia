const { response, request } = require("express");
const Barberia = require("../models/Barberia");

exports.obtenerBarberias = async (req = request, res = response) =>{
    try {
        const barberias = await Barberia.find();
        res.json({
            barberias
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

exports.obtenerBarberiasUsuario = async (req = request, res = response) =>{
  try {
    const {id} = req.params.id;
    const barberias = await Barberia.find({ usuario: id });
    res.json({
      barberias
    })
  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
}

exports.crearBarberia = async (req = request, res = response) => {
  try {
    const { servicios, horario, contacto, reseñas } = req.body;
    const barberia = new Barberia({
      servicios,
      horario,
      contacto,
      reseñas,
      createdBy: req.usuario,
    });

    barberia.save();
    res.json({
      barberia,
    });
  } catch (error) {
    res.json({ error: error });
    console.error(error);
  }
};

exports.actualizarBarberia = async (req = request, res = response) => {
  try {
    const { servicios, horario, contacto, reseñas } = req.body;
    const { id } = req.params;

    const barberia = await Barberia.findByIdAndUpdate(id, {
      servicios,
      horario,
      contacto,
      reseñas,

    }
    , { new: true });
    res.json({
      barberia,
    });
  } catch (error) {
    res.json({ error: error });
    console.error(error);
  }
};

exports.borrarBarberia = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const barberia = await Barberia.findByIdAndDelete(id);
    res.json({
      barberia,
    });
  } catch (error) {
    res.json({ error: error });
    console.error(error);
  }
};
