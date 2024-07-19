const express = require("express");
const {
  pegarCategorias,
  adicionarCategoria,
  atualizarCategoria,
  deletarCategoria,
} = require("../controllers/category");

const router = express.Router();

// Rotas para manipular categorias
router.get("/categories", pegarCategorias);
router.post("/categories", adicionarCategoria);
router.put("/categories/:idCategory", atualizarCategoria);
router.delete("/categories/:idCategory", deletarCategoria);

module.exports = router;
