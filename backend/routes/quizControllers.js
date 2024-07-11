const express = require("express");
const quizController = require("../controllers/quizController");

const router = express.Router();

// Rotas para manipular respostas
router.get("/questions/:question_id/answers", quizController.pegarRespostas);
router.post(
  "/questions/:question_id/answers",
  quizController.adicionarResposta
);
router.put(
  "/questions/:question_id/answers/:answer_id",
  quizController.atualizarResposta
);
router.delete(
  "/questions/:question_id/answers/:answer_id",
  quizController.deletarResposta
);

// Rotas para manipular questões
router.get("/quizzes/:quiz_id/questions", quizController.pegarQuestoes);
router.post("/quizzes/questions", quizController.adicionarQuestao);
router.put("/quizzes/questions/:question_id", quizController.atualizarQuestao);
router.delete("/quizzes/questions/:question_id", quizController.deletarQuestao);

module.exports = router;
