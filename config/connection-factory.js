var mysql = require("mysql");


module.exports = function(){
 return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "autenticacao",
    port: 3305
  });
} 
