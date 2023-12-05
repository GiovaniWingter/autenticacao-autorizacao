var mysql = require("mysql2");
const dotenv = require('dotenv');
dotenv.config();

module.exports = function () {
  try {
    let conexao = mysql.createConnection({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    port: process.env.MYSQL_ADDON_PORT
  });
  console.log("Conexão estabelecida!");
  return conexao;
} catch (e) {
  console.log("Falha ao estabelecer a conexão!");
  console.log(e);
  return null
}
} 
