const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = (req, res, next) => {
  // Leer el Token
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
};

const validarAdmin = async (req, res, next) => {
  const uid = req.uid;

  try {
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "El usuario no existe",
      });
    } else if (usuario.role !== "ADMIN_ROLE") {
      return res.status(401).json({
        ok: false,
        msg: "No posee los privilegios para realizar esta acción",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const validarAdmin_o_mismoUsuario = async (req, res, next) => {
  const uid = req.uid;
  const loggedUid = req.params.id;

  try {
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "El usuario no existe",
      });
    }

    if (usuario.role === "ADMIN_ROLE" || uid === loggedUid) {
      next();
    } else {
      return res.status(401).json({
        ok: false,
        msg: "No posee los privilegios para realizar esta acción",
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

module.exports = {
  validarJWT,
  validarAdmin,
  validarAdmin_o_mismoUsuario,
};
