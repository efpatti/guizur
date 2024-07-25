const db = require("../db.js");

// Função para construir consultas com filtros e limites
const buildQueryWithFiltersAndLimit = (baseQuery, filters, limit) => {
  let query = baseQuery;
  const params = [];

  if (filters.length > 0) {
    const filterConditions = filters
      .map((filter, index) => `(${filter.condition})`)
      .join(" AND ");
    query += ` AND ${filterConditions}`;
  }

  if (limit) {
    query += " LIMIT ?";
    params.push(limit);
  }

  return { query, params };
};

// Exemplo de como usar a função auxiliar
exports.pegarQuizComFiltros = (req, res, filtroTipo) => {
  const { author_id, category, type, _limit } = req.query;
  const limit = _limit ? parseInt(_limit, 10) : 10;

  // Base da consulta SQL
  let baseQuery = `SELECT * FROM quizzes WHERE 1=1`; // 1=1 é uma condição verdadeira para facilitar a concatenação

  // Adiciona filtros
  const filters = [];
  if (author_id) filters.push({ condition: `author_id = ?`, value: author_id });
  if (category) filters.push({ condition: `category = ?`, value: category });
  if (type) filters.push({ condition: `type = ?`, value: type });

  const { query, params } = buildQueryWithFiltersAndLimit(
    baseQuery,
    filters,
    limit
  );

  db.query(query, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Nenhum quiz encontrado" });
    }
    res.status(200).json(result);
  });
};
