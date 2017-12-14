const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  now = new Date().toString();
  var log =`${now}, ${req.method}, ${req.url}, ${req.protocol}, ${res.headersSent}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if(err){
      console.log("unable to add to the file");
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIT', (text) => {
  return text.toUpperCase();
});


app.get('/' , (req, res) =>{
  //  res.send(`<h2> My name is Bose </h2> <ul>hello <li> blue</li> <li> red</li></ul>`);
  res.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMsg: 'Welcome to my homepage'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About'
  });
});

app.get('/help', (req, res) => {
  res.render('help.hbs', {
    pageTitle: 'Help',
    link: `https://www.google.com`
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: "error handling request"
  });
});

app.listen(port, () =>{
  console.log(`The server is up on ${port}`);
});
