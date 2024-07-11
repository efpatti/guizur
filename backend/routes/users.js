const express = require("express");
const {
  pegarUsuarios,
  adicionarUsuario,
  atualizarUsuario,
  deletarUsuario,
  logarUsuario,
  rotaProtegida,
} = require("../controllers/user.js");

const router = express.Router();

router.get("/usuarios", pegarUsuarios);

router.post("/usuarios", adicionarUsuario);

router.post("/loginUsuario", logarUsuario);

router.get("/protegido", rotaProtegida);

router.put("/usuarios/:idUsuario", atualizarUsuario);

router.delete("/usuarios/:idUsuario", deletarUsuario);

module.exports = router;
