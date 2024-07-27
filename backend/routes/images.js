const express = require("express");
const router = express.Router();
const imageController = require("../controllers/image");

// Rota para upload de imagem do usuário
router.post("/upload", imageController.uploadUserImage);

// Rota para obter imagem do usuário
router.get("/image/:idUsuario", imageController.getUserImage);

module.exports = router;
