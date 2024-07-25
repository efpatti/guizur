const db = require("../db.js");
const { pegarQuizComFiltros } = require("./dbUtils.js");

exports.pegarQuizzes = (req, res) => {
  let { _limit } = req.query;
  _limit = _limit ? parseInt(_limit) : 10;

  const q = `SELECT * FROM quizzes LIMIT ?`;
  db.query(q, [_limit], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json(data);
  });
};

exports.pegarQuizPeloAutor = (req, res) => {
  const author_id = req.query.author_id;
  let limit = req.query._limit || 10;

  const sql = "SELECT * FROM quizzes WHERE author_id = ? LIMIT ?";
  db.query(sql, [author_id, limit], (err, result) => {
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

exports.pegarQuizPelaCategoria = (req, res) => {
  req.query.category = req.query.category || null;
  req.query.type = null;
  req.query.author_id = null;
  pegarQuizComFiltros(req, res, "category");
};

exports.pegarQuizPeloTipo = (req, res) => {
  req.query.type = req.query.type || null;
  req.query.category = null;
  req.query.author_id = null;
  pegarQuizComFiltros(req, res, "type");
};

exports.pegarQuizPeloId = (req, res) => {
  const quiz_id = req.params.quiz_id;

  const sql = "SELECT * FROM quizzes WHERE quiz_id = ?";
  db.query(sql, [quiz_id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (result.length === 0) {
        res
          .status(404)
          .json({ message: "Quizzes não encontrados para este id" });
      } else {
        res.status(200).json(result);
      }
    }
  });
};

exports.adicionarQuiz = (req, res) => {
  const { title, description, author_id, category, type } = req.body;

  const q =
    "INSERT INTO quizzes (title, description, author_id, category, type) VALUES (?, ?, ?, ?, ?)";
  const values = [title, description, author_id, category, type];

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
  const { title, description, category, type } = req.body;
  const quiz_id = req.params.idQuiz;

  const q =
    "UPDATE quizzes SET title = ?, description = ?, category = ?, type = ? WHERE quiz_id = ?";
  const values = [title, description, category, type, quiz_id];

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
