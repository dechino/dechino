// server.js (Express 4.0)
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();
 var path    = require('path');

app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser()); 						// pull information from html in POST
app.use(methodOverride()); 					// simulate DELETE and PUT


var router = express.Router();

var contacts =
 [{id: 0,'name': 'Roberto','email': 'roby@gmail.com','phone': '123-234344'},
    {id: 1,'name': 'Mario','email': 'mario@gmail.com','phone': '123-98765'},
    {id: 2,'name': 'Pino','email': 'pino@gmail.com','phone': '123-7777'},
    {id: 3,'name': 'Lino','email': 'lino@gmail.com','phone': '123-88888'},
    {id: 4,'name': 'Gino','email': 'gino@gmail.com','phone': '123-999999'},
    {id: 5,'name': 'Zito','email': 'ziot@gmail.com','phone': '123-555555'}];
var lastId = 6;

router.get('/contact', function(req, res) {
  res.send(JSON.stringify(contacts));
});
router.post('/contact', function(req, res) {
  var contact = req.body;
  contact.id = lastId;
  lastId++;
  contacts.push(contact);
  res.send(contact);
});

router.get('/contact/:id', function(req, res) {
  for (var i = 0; i < notes.length; i++) {
    if (notes[i].id == req.params.id) {
      res.send(notes[i]);
      break;
    }
  }
  res.send({msg: 'Note not found'}, 404);
});
router.post('/contacts/:id', function(req, res) {
  for (var i = 0; i < notes.length; i++) {
    if (notes[i].id == req.params.id) {
      notes[i] = req.body;
      notes[i].id = req.params.id;
      res.send(notes[i]);
      break;
    }
  }
  res.send({msg: 'Note not found'}, 404);
});

function stampa(contatcs){
for (var i = 0; i < contacts.length; i++) {

  console.log(contacts[i].id)
}


}
router.delete('/contacts/:id', function(req, res) {
  console.log("ciao"+req.params.id)
  for (var i = 0; i < contacts.length; i++) {
    console.log("dentro for:" +contacts[i].id + " valore passato:"+ req.params.id)
    if (contacts[i].id == req.params.id) {
              contacts.splice(i, 1);
              lastId--
              break;
            }
     
      
    }
  stampa(contacts);
  res.send({msg: 'Delete succesfully'}, 200);
});

 //creo il server 
 app.get('/', function(req,res){

  res.sendFile(path.join(__dirname+'/indexForm.html'))
 });

app.use('/api', router);




app.listen(8000);
console.log('Open http://localhost:8000 to access the files now'); 			// shoutout to the user
