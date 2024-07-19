const express = require("express");
const {
  pegarTipos,
  adicionarTipo,
  atualizarTipo,
  deletarTipo,
} = require("../controllers/type");

const router = express.Router();

// Rotas para manipular tipos
router.get("/types", pegarTipos);
router.post("/types", adicionarTipo);
router.put("/types/:idType", atualizarTipo);
router.delete("/types/:idType", deletarTipo);

module.exports = router;
