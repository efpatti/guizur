const express = require("express");
const {
  pegarQuizzes,
  adicionarQuiz,
  atualizarQuiz,
  deletarQuiz,
  pegarQuizPeloAutor,
} = require("../controllers/quiz");

const router = express.Router();

router.get("/quizzes", pegarQuizzes);
router.get("/quizzes/autor", pegarQuizPeloAutor); // Rota para pegar quizzes por autor

router.post("/quizzes", adicionarQuiz);
router.put("/quizzes/:quiz_id", atualizarQuiz);
router.delete("/quizzes/:quiz_id", deletarQuiz);

module.exports = router;
