const express = require("express");
const app = express();
const port = process.env.PORT; 

var session = require("express-session");

app.use(express.static("./app/public"));

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
  }));

var rotas = require("./app/routes/router");
app.use("/", rotas);

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
