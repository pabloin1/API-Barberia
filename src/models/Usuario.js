const { Schema, model } = require("mongoose");


const userSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido "],
  },
  apellido: {
    type: String,
    required: [true, "El nombre es requerido "],
  },
  correo: {
    type: String,
    required: [true, "El correo es requerido"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es requerida"],
  },
  img: {
    type: String,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.toJSON = function () {
  const { __v, _id, password, ...usuario } = this.toObject();

  usuario.uid = _id;

  return usuario;
};

module.exports = model("Usuario", userSchema);
