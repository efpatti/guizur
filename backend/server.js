const express = require("express");
const cors = require("cors");
const usuariosRota = require("./routes/usuarios");

const app = express();
const PORT = process.env.PORT || 8080; // Adicionando suporte a variáveis de ambiente para a porta

// Middleware para lidar com a política de mesma origem (CORS)
app.use(
  cors({
    origin: "http://localhost:3000", // Especifique a URL do seu frontend React
    credentials: true, // Se você estiver usando cookies ou cabeçalhos personalizados, defina isso como true
  })
);

// Middleware para lidar com dados JSON
app.use(express.json());

// Rotas
app.use("/", usuariosRota); // Específico para as rotas de usuários

// Lidar com rotas não encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Middleware para lidar com erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erro interno do servidor" });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
