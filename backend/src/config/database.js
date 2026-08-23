// const mysql = require("mysql2/promise");

// const db = mysql.createPool({
//     host:process.env.DB_HOST,
//     user:process.env.DB_USER,
//     password:process.env.DB_PASSWORD,
//     database:process.env.DB_NAME,
//     waitForConnections:true,
//     connectionLimit:10,
//     charset: "utf8mb4",
// });

// module.exports = db;

import mysql from "mysql2/promise";
import "dotenv/config";

const db = mysql.createPool(process.env.MYSQL_URL);

try {
  const connection = await db.getConnection();
  console.log("Banco de dados conectado com sucesso!");
  connection.release();
} catch (error) {
  console.error("Erro ao conectar ao banco:", error);
}

export default db;