const express = require("express");
const {
  pegarRespostas,
  adicionarResposta,
  atualizarResposta,
  deletarResposta,
  pegarQuestoes,
  adicionarQuestao,
  atualizarQuestao,
  deletarQuestao,
} = require("../controllers/quizController");

const router = express.Router();

// Rotas para manipular respostas
router.get("/questions/:question_id/answers", pegarRespostas);
router.post("/questions/:question_id/answers", adicionarResposta);
router.put("/questions/:question_id/answers/:answer_id", atualizarResposta);
router.delete("/questions/:question_id/answers/:answer_id", deletarResposta);

// Rotas para manipular questões
router.get("/quizzes/:quiz_id/questions", pegarQuestoes);
router.post("/quizzes/questions", adicionarQuestao);
router.put("/quizzes/questions/:question_id", atualizarQuestao);
router.delete("/quizzes/questions/:question_id", deletarQuestao);

module.exports = router;
