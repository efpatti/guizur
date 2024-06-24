const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Desenvolvedor@123",
  database: "guizur",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Conectado ao database!");
});

module.exports = db;
