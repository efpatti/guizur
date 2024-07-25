const db = require("../db.js");

exports.pegarCategorias = (req, res) => {
  let { _limit } = req.query;
  _limit = _limit ? parseInt(_limit, 10) : 10; // Definindo o valor padrão para _limit, se não fornecido

  const q = `SELECT * FROM categories LIMIT ${_limit}`; // Incluindo o limite diretamente na string SQL
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json(data);
  });
};

exports.adicionarCategoria = (req, res) => {
  const { name, code } = req.body;

  const q = "INSERT INTO categories (name, code) VALUES (?, ?)";
  const values = [name, code];

  db.query(q, values, (err, result) => {
    if (err) {
      console.error("Erro ao inserir categoria no banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json({
      message: "Categoria adicionada com sucesso!",
      idCategory: result.insertId,
    });
  });
};

exports.atualizarCategoria = (req, res) => {
  const { name, code } = req.body; // Desestruturação correta
  const idCategory = req.params.idCategory; // Captura o ID da categoria da URL

  const q =
    "UPDATE categories SET `name` = ?, `code` = ? WHERE `idCategory` = ?";
  const values = [name, code, idCategory];

  db.query(q, values, (err) => {
    if (err) {
      console.error("Erro ao atualizar categoria:", err);
      return res
        .status(500)
        .json({ error: "Erro interno do servidor ao atualizar categoria" });
    }
    return res.status(200).json("Categoria atualizada com sucesso!");
  });
};

exports.deletarCategoria = (req, res) => {
  const idCategory = req.params.idCategory;

  const q = "DELETE FROM categories WHERE idCategory = ?";

  db.query(q, [idCategory], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json("Categoria deletada com sucesso!");
  });
};
