const { Router } = require("express");
const citaController = require('../controllers/cita.controller')

const citaRouter = Router();

citaRouter.get('/', citaController.obtenerCitas)

citaRouter.post('/', citaController.crearCita)

citaRouter.put('/:id', citaController.actualizarCita)

citaRouter.delete('/:id', citaController.borrarCita)

module.exports = citaRouter;