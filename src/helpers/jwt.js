const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.llave,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("no se pudo generar token");
        } else {
          resolve(token);
        }
      }
    );
  });
};


module.exports = {
  generarJWT,
};
