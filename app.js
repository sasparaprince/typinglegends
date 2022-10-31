const express = require('express');
const app = express();
const path = require("path");
const router = express.Router();
var http = require('http');

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.use(express.static(path.join(__dirname, 'public')));

router.get('/contact',function(req,res){
  res.sendFile(path.join(__dirname+'/contact.html'));
});

router.get('/privacy',function(req,res){
  res.sendFile(path.join(__dirname+'/privacy.html'));
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
