var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(12);
var fabricaDeConexao = require("../../config/connection-factory");
var conexao = fabricaDeConexao();
const dotenv = require('dotenv');
dotenv.config();

router.get("/", function (req, res) {
  if (req.session.autenticado) {
    autenticado = { autenticado: req.session.usu_autenticado };
  } else {
    autenticado = { autenticado: null };
  }
  res.render("pages/index", autenticado);
});

router.get("/sair", function (req, res) {
  req.session.destroy();
  res.redirect("/");
});

router.get("/login", function (req, res) {
  res.render("pages/login");
});

router.get("/cadastro", function (req, res) {
  res.render("pages/cadastro");
});

router.post(
  "/login",

  function (req, res) {
    var dadosForm = {
      user_usuario: req.body.nome_usu,
      senha_usuario: req.body.senha_usu,
    };
    try{
    var result = conexao.query(
      "SELECT * FROM usuario WHERE user_usuario = ? or email_usuario = ?",
      [dadosForm.user_usuario, dadosForm.user_usuario],

      function (error, results, fields) {
        if (error) throw error;
        var total = Object.keys(results).length;
        console.log(results);
        console.log(total);
        if (total == 1) {
          if (bcrypt.compareSync(dadosForm.senha_usuario, results[0].senha_usuario)) {
            req.session.autenticado = true;
            req.session.usu_autenticado = results[0].nome_usuario;
            req.session.usu_tipo = results[0].tipo_usuario;
            console.log(req.session.autenticado);
            console.log(req.session.usu_autenticado);
          }

        }
        res.redirect(process.env.CYCLIC_URL);
      }
    );
    }catch(e){
      console.log(e);
    }
  }
);

router.post("/cadastro", function (req, res) {
  var dadosForm = {
    user_usuario: req.body.nomeusu_usu,
    senha_usuario: bcrypt.hashSync(req.body.senha_usu, salt),
    nome_usuario: req.body.nome_usu,
    email_usuario: req.body.email_usu,
  };

  var result = conexao.query(
    "INSERT INTO usuario SET ?",
    dadosForm,
    function (error, results, fields) {
      if (error) throw error;
      res.redirect(process.env.CYCLIC_URL);
    }
  );
});

router.get("/adm", function (req, res) {
  if (req.session.autenticado == true && req.session.usu_tipo == 1) {
    autenticado = { autenticado: req.session.usu_autenticado };
    res.render("pages/adm", autenticado);
  } else {
    res.send("Área restrita");
  }
});

module.exports = router;
