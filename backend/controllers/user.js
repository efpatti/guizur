const db = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "sua_chave_secreta_aqui";

exports.pegarUsuarios = (req, res) => {
  let { _limit } = req.query;
  if (!_limit) {
    _limit = 10; // Definindo um valor padrão para _limit, caso não seja fornecido
  } else {
    _limit = parseInt(_limit); // Convertendo para número inteiro, se necessário
  }

  const q = `SELECT * FROM cadastrousuario LIMIT ?`;
  db.query(q, [_limit], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json(data);
  });
};

// Função para buscar um usuário pelo ID
exports.pegarUsuarioPorId = (req, res) => {
  const idUsuario = req.params.idUsuario; // Alterado para req.params

  const sql = "SELECT * FROM cadastrousuario WHERE idUsuario = ?";
  db.query(sql, [idUsuario], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: "Usuário não encontrado" });
      } else {
        res.status(200).json(result[0]); // Retorna apenas o primeiro resultado
      }
    }
  });
};

exports.adicionarUsuario = (req, res) => {
  const {
    nome,
    email,
    telefone,
    cpf,
    cep,
    rua,
    numeroCasa,
    cidade,
    estado,
    tipo,
    senha,
  } = req.body;

  const q =
    "INSERT INTO cadastrousuario (`nome`, `email`, `telefone`, `cpf`, `cep`, `rua`, `numeroCasa`, `cidade`, `estado`, `tipo`, `senha`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  // Validar entrada
  if (
    !nome ||
    !email ||
    !telefone ||
    !cpf ||
    !cep ||
    !rua ||
    !numeroCasa ||
    !cidade ||
    !estado ||
    !tipo ||
    !senha
  ) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  // Gera o hash da senha
  bcrypt.hash(senha, 10, (err, hash) => {
    if (err) {
      console.error("Erro ao gerar hash da senha:", err);
      return res.status(500).json("Erro interno do servidor");
    }

    const values = [
      nome,
      email,
      telefone,
      cpf,
      cep,
      rua,
      numeroCasa,
      cidade,
      estado,
      tipo,
      hash,
    ];

    db.query(q, values, (err, result) => {
      if (err) {
        console.error("Erro ao inserir usuário no banco de dados:", err);
        return res.status(500).json("Erro interno do servidor");
      }

      return res.status(200).json({
        message: "Usuário adicionado com sucesso!",
      });
    });
  });
};

exports.atualizarUsuario = (req, res) => {
  const {
    nome,
    email,
    cpf,
    cep,
    rua,
    numeroCasa,
    cidade,
    estado,
    tipo,
    senha,
  } = req.body;

  const q =
    "UPDATE cadastrousuario SET `nome` = ?, `email` = ?, `cpf` = ?, `cep` = ?, `rua` = ?, `numeroCasa` = ?, `cidade` = ?, `estado` = ?, `tipo` = ?, `senha` = ? WHERE `idUsuario` = ?";

  // Validar entrada
  if (
    !nome ||
    !email ||
    !cpf ||
    !cep ||
    !rua ||
    !numeroCasa ||
    !cidade ||
    !estado ||
    !tipo ||
    !senha
  ) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const values = [
    nome,
    email,
    cpf,
    cep,
    rua,
    numeroCasa,
    cidade,
    estado,
    tipo,
    senha,
    req.params.idUsuario,
  ];

  db.query(q, values, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json("Usuário atualizado com sucesso!");
  });
};

exports.deletarUsuario = (req, res) => {
  const q = "DELETE FROM cadastrousuario WHERE `idUsuario` = ?";

  db.query(q, [req.params.idUsuario], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json("Usuário deletado com sucesso!");
  });
};

exports.logarUsuario = (req, res) => {
  const { email, senha } = req.body;

  // Verificar se o usuário existe no banco de dados
  db.query(
    "SELECT * FROM cadastrousuario WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Email ou senha inválidos" });
      }

      // Comparar a senha fornecida com a senha armazenada no banco de dados
      bcrypt.compare(senha, results[0].senha, (err, match) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (!match) {
          return res.status(401).json({ message: "Email ou senha inválidos" });
        }

        // Verificar o tipo de usuário
        const tipo = results[0].tipo;

        let token;
        if (tipo === "Administrador") {
          // Gerar um token de administrador
          token = jwt.sign(
            {
              idUsuario: results[0].idUsuario,
              nome: results[0].nome,
              email: results[0].email,
              cpf: results[0].cpf,
              cep: results[0].cep,
              rua: results[0].rua,
              numeroCasa: results[0].numeroCasa,
              cidade: results[0].cidade,
              estado: results[0].estado,
              tipo: "Administrador",
            },
            jwtSecret,
            {
              expiresIn: "1h",
            },
            console.log("a", tipo)
          );
        } else if (tipo === "Usuário") {
          // Gerar um token de Usuário
          token = jwt.sign(
            {
              idUsuario: results[0].idUsuario,
              nome: results[0].nome,
              email: results[0].email,
              cpf: results[0].cpf,
              cep: results[0].cep,
              rua: results[0].rua,
              numeroCasa: results[0].numeroCasa,
              cidade: results[0].cidade,
              estado: results[0].estado,
              tipo: "Usuário",
            },
            jwtSecret,

            {
              expiresIn: "1h",
            },
            console.log("a", tipo)
          );
        } else {
          return res.status(401).json({ message: "Tipo de usuário inválido" });
        }

        res.status(200).json({ token });
      });
    }
  );
};

exports.rotaProtegida = (req, res) => {
  res.status(200).json({ message: "Seu token é válido" });
};
