const db = require("../db.js");

exports.pegarTipos = (req, res) => {
  let { _limit } = req.query;
  if (!_limit) {
    _limit = 10; // Definindo um valor padrão para _limit, caso não seja fornecido
  } else {
    _limit = parseInt(_limit); // Convertendo para número inteiro, se necessário
  }

  const q = `SELECT * FROM types LIMIT ?`;
  db.query(q, [_limit], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json(data);
  });
};

exports.adicionarTipo = (req, res) => {
  const { name, code } = req.body;

  const q = "INSERT INTO types (name, code) VALUES (?, ?)";
  const values = [name, code];

  db.query(q, values, (err, result) => {
    if (err) {
      console.error("Erro ao inserir tipo no banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json({
      message: "Tipo adicionada com sucesso!",
      idType: result.insertId,
    });
  });
};

exports.atualizarTipo = (req, res) => {
  const { name, code } = req.body; // Desestruturação correta
  const idType = req.params.idType; // Captura o ID da tipo da URL

  const q = "UPDATE types SET `name` = ?, `code` = ? WHERE `idType` = ?";
  const values = [name, code, idType];

  db.query(q, values, (err) => {
    if (err) {
      console.error("Erro ao atualizar tipo:", err);
      return res
        .status(500)
        .json({ error: "Erro interno do servidor ao atualizar tipo" });
    }
    return res.status(200).json("Tipo atualizada com sucesso!");
  });
};

exports.deletarTipo = (req, res) => {
  const idType = req.params.idType;

  const q = "DELETE FROM types WHERE idType = ?";

  db.query(q, [idType], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json("Tipo deletado com sucesso!");
  });
};
