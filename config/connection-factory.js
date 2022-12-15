var mysql = require("mysql");


module.exports = function(){
 return mysql.createConnection({
    host: "containers-us-west-157.railway.app",
    user: "root",
    password: "j9UM57eojqyR9IdfyLPw",
    database: "railway",
    port: 7083
  });
} 
