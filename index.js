var express = require('express');
var cors =  require('cors');
var bodyParser = require('body-parser');
var app = express();
var  services = require('./services');
var csrf = require('csurf') 
var hsts = require('hsts')
var csrfProtection = csrf({ cookie: true });
app.use(cors());
app.use(hsts({maxAge: 15552000})) 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/getuser_role',csrfProtection,services.getUserDetails);




app.listen(process.env.PORT);
console.log('Running on port 80');