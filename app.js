var express = require("express");

var app = express();

app.use(express.static("./router/"))

app.listen(3001);