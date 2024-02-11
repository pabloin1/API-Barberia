const { Router } = require("express");
const citaController = require('../controllers/cita.controller');
const { validarJwt } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");

const citaRouter = Router();

citaRouter.get('/',[validarJwt,validarCampos] ,citaController.obtenerCitas)

citaRouter.post('/',[validarJwt,validarCampos] ,citaController.crearCita)

citaRouter.delete('/:id',[validarJwt,validarCampos] ,citaController.borrarCita)

module.exports = citaRouter;