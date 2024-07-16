const db = require("../db.js");

exports.pegarQuizzes = (_, res) => {
  const q = "SELECT * FROM quizzes";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json(data);
  });
};

exports.pegarQuizPeloAutor = (req, res) => {
  const author_id = req.query.author_id;

  const sql = "SELECT * FROM quizzes WHERE author_id = ?";
  db.query(sql, [author_id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (result.length === 0) {
        res
          .status(404)
          .json({ message: "Quizzes não encontrados para este autor" });
      } else {
        res.status(200).json(result);
      }
    }
  });
};

exports.adicionarQuiz = (req, res) => {
  const { title, description, author_id } = req.body;

  const q =
    "INSERT INTO quizzes (title, description, author_id) VALUES (?, ?, ?)";
  const values = [title, description, author_id];

  db.query(q, values, (err, result) => {
    if (err) {
      console.error("Erro ao inserir quiz no banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json({
      message: "Quiz adicionado com sucesso!",
      quiz_id: result.insertId,
    });
  });
};

exports.atualizarQuiz = (req, res) => {
  const { title, description } = req.body;
  const quiz_id = req.params.idQuiz;

  const q = "UPDATE quizzes SET title = ?, description = ? WHERE quiz_id = ?";
  const values = [title, description, quiz_id];

  db.query(q, values, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json("Quiz atualizado com sucesso!");
  });
};

exports.deletarQuiz = (req, res) => {
  const quiz_id = req.params.idQuiz;

  const q = "DELETE FROM quizzes WHERE quiz_id = ?";

  db.query(q, [quiz_id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json("Quiz deletado com sucesso!");
  });
};
