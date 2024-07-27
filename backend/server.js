const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users");
const quizRoutes = require("./routes/quizzes");
const controllersRoutes = require("./routes/quizControllers");
const categoryRoutes = require("./routes/categories");
const typeRoutes = require("./routes/types");
const imageRoutes = require("./routes/images");
const bodyParser = require("body-parser");

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
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.use("/", userRoutes); // Específico para as rotas de usuários
app.use("/", quizRoutes); // Específico para as rotas de quizzes
app.use("/", categoryRoutes); // Específico para as rotas de categorias
app.use("/", typeRoutes); // Específico para as rotas de tipos
app.use("/", controllersRoutes); // Específico para as rotas de controladores
// Usar as rotas de imagem
app.use("/api", imageRoutes);

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
