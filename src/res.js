var express = require('express');

var mysql = require('mysql');

var router = express.Router();

var data = '';

var connection = mysql.createConnection({

    host: '127.0.0.1',

    user: 'root',

    password: '',

    database:'test'

});

connection.connect();

connection.query('select * from users', function(err, rows, fields) {

    data = rows;

})

router.get("/res",function(req,res){            
    //http://localhost:3001/res?callback=JSON_CALLBACK
    var n = req.url.split("callback=")[1];
    //console.log(n)  JSON_CALLBACK
    var callbackName = n.split("?")[0];
    //console.log(callbackName)  JSON_CALLBACK
    var c = n.split("?")[1];
    //console.log(c) undefiend
    var jsonp = JSON.stringify(data);
   
    var jsonpTxt = ""+callbackName+"("+jsonp+")";
     console.log(jsonpTxt)
    res.end(jsonpTxt);

})

module.exports = router;