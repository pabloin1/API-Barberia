const { Router } = require("express");
const barberiaController = require("../controllers/barberia.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");

const barberiaRouter = Router();

barberiaRouter.get(
  "/",
  [validarJwt, validarCampos],
  barberiaController.obtenerBarberias
);

barberiaRouter.post("/", [validarJwt, validarCampos], barberiaController.crearBarberia);

barberiaRouter.put(
  "/:id",
  [validarJwt, validarCampos],
  barberiaController.actualizarBarberia
);

barberiaRouter.delete(
  "/:id",
  [validarJwt, validarCampos],
  barberiaController.borrarBarberia
);

module.exports = barberiaRouter;