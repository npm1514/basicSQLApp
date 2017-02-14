const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const mainCtrl = require('./mainCtrl');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + "/public"));

app.get('/users', mainCtrl.read);
app.post('/users', mainCtrl.create);
app.put('/users/:id', mainCtrl.update);
app.delete('/users/:id', mainCtrl.delete);

app.listen('9000', function(){
  console.log("listening on 9000");
});
