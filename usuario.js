var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var Mongoose = require('Mongoose');
var db = Mongoose.connection;
var url_db = 'mongodb://localhost:27017/synchro';
var MongoClient = require('mongodb').MongoClient;

Mongoose.connect(url_db);

app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var _novo_usuario = new Mongoose.Schema({
  nome: String,
  email: String,
  telefone: String,
  cep: String,
  endereco: String,
  usuario: String,
  senha: String
});

var _novo_contato = new Mongoose.Schema({
  nome: String,
  email: String,
  telefone: String,
  cep: String,
  endereco: String,
});

const Usuario = Mongoose.model('usuario', _novo_usuario);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//rest retorna usuario
router.get('/', function (req, res, next) {
  var param_nome_usario = req.query.nome;
  var param_usuario = req.query.usuario;
  var param_email_usuario = req.query.email;
  var param_senha = req.query.senha;
  var param_tipo = req.query.tipo;
  var parametros;

  console.log(param_tipo);

  if (param_tipo == 'logon') {
    parametros = { usuario: param_usuario, senha: param_senha };

    Usuario.find(parametros, function (err, usuario) {
      if (err) return console.error(err);
      res.json({ usuario });
    });
  } else if (param_nome_usario != '') {
    parametros = { nome: param_nome_usario }

    Usuario.find(parametros, function (err, usuario) {
      if (err) return console.error(err);
      res.json({ usuario });
    });
  } else if (param_email_usuario != '') {
    parametros = { email: param_email_usuario }

    Usuario.find(parametros, function (err, usuario) {
      if (err) return console.error(err);
      res.json({ usuario });
    });
  } else if (param_usuario != '') {
    parametros = { usuario: param_usuario }
    
    Usuario.find(parametros, function (err, usuario) {
      if (err) return console.error(err);
      res.json({ usuario });
    });
  }
  
});

//inserção de usuario via post 
router.post('/', function (req, res) {
  console.log(req.body);

  _novo_usuario = req.body;

  MongoClient.connect(url_db, function (err, db) {
    if (err) throw err;
    var dbo = db.db('synchro');
    dbo.collection('usuarios').insertOne(_novo_usuario, function (err, res) {
      if (err) throw err;
      console.log('registro inserido com sucesso!');
      db.close();
    });
  });
});
app.use('/api/usuario', router);
app.listen(3000);