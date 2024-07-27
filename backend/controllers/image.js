const db = require("../db");

// Função para atualizar imagem do usuário
exports.uploadUserImage = (req, res) => {
  const { idUsuario, imageData, mimeType } = req.body;

  // Verifica se o ID do usuário está presente
  if (!idUsuario) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const query =
    "UPDATE cadastrousuario SET imagem = ?, mime_type = ? WHERE idUsuario = ?";
  db.query(
    query,
    [Buffer.from(imageData, "base64"), mimeType, idUsuario],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "Image uploaded successfully" });
    }
  );
};

// Função para obter imagem do usuário
exports.getUserImage = (req, res) => {
  const query =
    "SELECT imagem, mime_type FROM cadastrousuario WHERE idUsuario = ?";
  db.query(query, [req.params.idUsuario], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) {
      const image = results[0];
      res.set("Content-Type", image.mime_type);
      res.send(image.imagem);
    } else {
      res.status(404).send("Image not found");
    }
  });
};
