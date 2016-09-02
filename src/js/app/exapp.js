var express = require("express");

var app = express();

app.use(express.static("./e-commerce/"))

app.listen(3000);
