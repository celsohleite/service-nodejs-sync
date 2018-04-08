var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var Mongoose = require('Mongoose');
var db = Mongoose.connection;

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


var Usuario = Mongoose.model('Usuario', _novo_usuario);

//db connection
db.on('error', console.error);
db.once('open', function () {
  console.log('Conectado ao MongoDB.')
});

Mongoose.connect('mongodb://localhost:27017/synchro');

//rest retorna usuario
router.get('/:user/:senha', function (req, res) {
  var user = req.param('user');
  var senha = req.param('senha');

  Usuario.find({ usuario: user , senha : senha }, function (err, usuario) {
    if (err) return console.error(err);
    res.json({ usuario });
  });
});

//rest cria novo usuario
router.post('/', function (req, res) {
  
  var user = req.param('');

  synchro.save(function (err, synchro) {
    if (err) return console.error(err);
    console.dir(synchro);
  });
  
});

router.put('/', function (req, res) {

});

router.delete('/', function (req, res) {

});

app.use('/api/usuario', router);

app.listen(3000);