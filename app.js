/*
app.js on express-sovelluksen päätiedosto josta sovellus lähtee käyntiin
*/

const express = require('express');
const session = require('express-session');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const validator = require('express-validator');
//необходимо для установления соединения с монго
const mongoose = require('mongoose');
require('dotenv').config(); //dotenv -moduuli tarvitaan jos aiotaan käyttää .env -filua

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

//соединение с монго осуществляется здесь
mongoose.set('useUnifiedTopology', true); // määritys jota käytetään tietokantapalvelimen etsinnässä

mongoose.connect(
  'mongodb://' +
    process.env.DB_USER +
    ':' +
    process.env.DB_PW +
    '@localhost:27017/studentdb',
  { useNewUrlParser: true }
)
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Database connection error');
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
})
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*Session käyttöönotto
  Sessio toimii siten että luotaessa sessio syntyy selaimelle automaattisesti cookie jonka
  nimi on connect.sid (sessionid). Se ylläpitää yhteyttä palvelimella olevaan sessioon
  sen sisältämän sessioid:n avulla.
  Itse sessio sisältää sessiomuuttujia, joita voidaan lukea siirryttäessä sivulta toiselle.
  Jos sessiomuuttujana on vaikka salasana, niin sivuille siirryttäessä voidaan tutkia onko
  salasana oikea ja jos on, päästetään käyttäjä sivulle. Session voimassaoloaika on tässä 10 minuuttia.
*/
app.use(
  session({
    secret: 'salausarvo',
    cookie: {
      maxAge: 6000000,
    },
    resave: true,
    saveUninitialized: true,
  })
);

app.use(validator()); // lomakevalidaattorin käyttöönotto

app.use('/', index); // index-reitti
app.use('/users', users); // users-reitti

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
