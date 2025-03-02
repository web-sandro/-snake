var express = require('express');
var path = require('path');
var gameRoutes = require("./routes/gameRoutes");
var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", gameRoutes);

module.exports = app;