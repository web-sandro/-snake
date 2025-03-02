var express = require('express');
var path = require('path');
// var indexRouter = require('./routes/indexRoutes');
var gameRoutes = require("./routes/gameRoutes");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use("/", gameRoutes);

module.exports = app;