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

var _novo_contato = new Mongoose.Schema({
    nome: String,
    email: String,
    telefone: String,
    cep: String,
    endereco: String,
});

const Contato = Mongoose.model('contato', _novo_contato);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//rest retorna lista de contatos
router.get('/', function (req, res, next) {
  
    Contato.find({}, function (err, contato) {
    if (err) return console.error(err);
    res.json({ contato });
  });
});

//inserção de contato via post 
router.post('/', function (req, res) {
  console.log(req.body);

  _novo_contato = req.body;

  MongoClient.connect(url_db, function (err, db) {
    if (err) throw err;
    var dbo = db.db('synchro');
    dbo.collection('contatos').insertOne(_novo_contato, function (err, res) {
      if (err) throw err;
      console.log('registro inserido com sucesso!');
      db.close();
    });
  });
});

app.use('/api/contato', router);
app.listen(3000);