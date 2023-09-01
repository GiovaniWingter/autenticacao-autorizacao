var mysql = require("mysql");


module.exports = function(){
 return mysql.createConnection({
    host: "bq8ntzhj31qfyrrhcv9d-mysql.services.clever-cloud.com",
    user: "ugcbcm2fmgo2row7",
    password: "w1heNU2gip8WTsGN51TI",
    database: "bq8ntzhj31qfyrrhcv9d",
    port: 3306
  });
} 
