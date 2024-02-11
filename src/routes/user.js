//rutas para usuario en caso de una base de datos
const { Router } = require("express");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/user.controller");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { emailExiste, idExiste } = require("../helpers/db-validator");
const { validarJwt } = require("../middlewares/validar-jwt");


const routerProduct = Router();

routerProduct.get("/", usuariosGet);

routerProduct.put("/:id",[
  check('id', "No es un id valido").isMongoId(),
  check("id").custom(idExiste),
  validarCampos
], usuariosPut);

routerProduct.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("password", "La contraseña debe de ser mayor a 6 letras").isLength({min: 6}),
    check("correo", "El correo no es válido").isEmail(),
    check('correo').custom(emailExiste),
    validarCampos
  ],
  usuariosPost
);

routerProduct.delete("/:id",[
  validarJwt,
  check('id', "No es un id valido").isMongoId(),
  check("id").custom(idExiste),
  validarCampos
], usuariosDelete);

routerProduct.patch("/", usuariosPatch);

module.exports = routerProduct;
