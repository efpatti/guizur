const db = require("../db.js");

// Pegar todas as questões de um quiz específico
exports.pegarQuestoes = (req, res) => {
  const quiz_id = req.params.quiz_id;
  const q = `
     SELECT q.question_id, q.question_text,
            a.answer_id, a.answer_text, a.is_correct
     FROM questions q
     LEFT JOIN answers a ON q.question_id = a.question_id
     WHERE q.quiz_id = ?
     ORDER BY q.question_id, a.answer_id
   `;

  db.query(q, [quiz_id], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });

    // Organiza os dados em um formato mais estruturado para cada questão
    const questions = [];
    let currentQuestion = null;

    data.forEach((row) => {
      if (!currentQuestion || currentQuestion.question_id !== row.question_id) {
        // Nova questão encontrada
        currentQuestion = {
          question_id: row.question_id,
          question_text: row.question_text,
          answers: [],
        };
        questions.push(currentQuestion);
      }

      // Adiciona a resposta à questão atual
      if (row.answer_id) {
        currentQuestion.answers.push({
          answer_id: row.answer_id,
          answer_text: row.answer_text,
          is_correct: row.is_correct,
        });
      }
    });

    return res.status(200).json(questions);
  });
};

// Adicionar uma nova questão e suas respostas

exports.adicionarQuestao = (req, res) => {
  const { quiz_id, question_text, alternatives } = req.body;

  // Primeiro, insere a nova questão na tabela `questions`
  const q1 = "INSERT INTO questions (quiz_id, question_text) VALUES (?, ?)";
  const values1 = [quiz_id, question_text];

  db.query(q1, values1, (err, result) => {
    if (err) {
      console.error("Erro ao inserir questão no banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    const question_id = result.insertId;

    // Em seguida, insere as alternativas na tabela `answers`
    const q2 =
      "INSERT INTO answers (question_id, answer_text, is_correct) VALUES ?";

    // Constrói os valores para inserção das alternativas e determinação da correta
    let values2 = alternatives.map((alternative) => [
      question_id,
      alternative.answer_text,
      alternative.is_correct ? 1 : 0,
    ]);

    // Verifica se há uma resposta correta definida
    const hasCorrectAnswer = alternatives.some(
      (alternative) => alternative.is_correct
    );

    if (!hasCorrectAnswer) {
      return res
        .status(400)
        .json({ error: "É necessário definir uma resposta correta." });
    }

    db.query(q2, [values2], (err) => {
      if (err) {
        console.error("Erro ao inserir alternativas no banco de dados:", err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }

      return res.status(200).json({
        message: "Questão adicionada com sucesso!",
        question_id: question_id,
      });
    });
  });
};

// Atualizar uma questão e suas respostas
exports.atualizarQuestao = (req, res) => {
  const { question_text, answers } = req.body;
  const question_id = req.params.question_id;

  // Atualiza a questão na tabela `questions`
  const q1 = "UPDATE questions SET question_text = ? WHERE question_id = ?";
  const values1 = [question_text, question_id];

  db.query(q1, values1, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    // Deleta as respostas antigas da tabela `answers`
    const q2 = "DELETE FROM answers WHERE question_id = ?";
    db.query(q2, [question_id], (err) => {
      if (err) {
        console.error("Erro ao deletar respostas antigas:", err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }

      // Insere as novas respostas na tabela `answers`
      const q3 =
        "INSERT INTO answers (question_id, answer_text, is_correct) VALUES (?, ?, ?)";
      const values3 = answers.map((answer) => [
        question_id,
        answer.answer_text,
        answer.is_correct ? 1 : 0, // Converte true/false para 1/0
      ]);

      db.query(q3, values3, (err) => {
        if (err) {
          console.error("Erro ao inserir novas respostas:", err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        return res.status(200).json("Questão atualizada com sucesso!");
      });
    });
  });
};

// Deletar uma questão e suas respostas
exports.deletarQuestao = (req, res) => {
  const question_id = req.params.question_id;

  // Deleta a questão da tabela `questions`
  const q1 = "DELETE FROM questions WHERE question_id = ?";
  db.query(q1, [question_id], (err) => {
    if (err) {
      console.error("Erro ao deletar questão:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    // Deleta todas as respostas associadas da tabela `answers`
    const q2 = "DELETE FROM answers WHERE question_id = ?";
    db.query(q2, [question_id], (err) => {
      if (err) {
        console.error("Erro ao deletar respostas da questão:", err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }

      return res.status(200).json("Questão e respostas deletadas com sucesso!");
    });
  });
};

// Pegar todas as respostas de uma questão específica
exports.pegarRespostas = (req, res) => {
  const question_id = req.params.question_id;
  const q = "SELECT * FROM answers WHERE question_id = ?";

  db.query(q, [question_id], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json(data);
  });
};

// Adicionar uma nova resposta para uma questão específica
exports.adicionarResposta = (req, res) => {
  const { question_id, answer_text, is_correct } = req.body;

  const q =
    "INSERT INTO answers (question_id, answer_text, is_correct) VALUES (?, ?, ?)";
  const values = [question_id, answer_text, is_correct ? 1 : 0]; // Converte booleano para 1/0

  db.query(q, values, (err, result) => {
    if (err) {
      console.error("Erro ao inserir resposta no banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json({
      message: "Resposta adicionada com sucesso!",
      answer_id: result.insertId,
    });
  });
};

// Atualizar uma resposta existente
exports.atualizarResposta = (req, res) => {
  const { answer_text, is_correct } = req.body;
  const answer_id = req.params.answer_id;

  const q =
    "UPDATE answers SET answer_text = ?, is_correct = ? WHERE answer_id = ?";
  const values = [answer_text, is_correct ? 1 : 0, answer_id];

  db.query(q, values, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json("Resposta atualizada com sucesso!");
  });
};

// Deletar uma resposta específica
exports.deletarResposta = (req, res) => {
  const answer_id = req.params.answer_id;

  const q = "DELETE FROM answers WHERE answer_id = ?";

  db.query(q, [answer_id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json("Resposta deletada com sucesso!");
  });
};
