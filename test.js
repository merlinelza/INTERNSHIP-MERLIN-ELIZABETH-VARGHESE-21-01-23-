var express=require('express');
var app=express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/rimit');

app.use(bodyParser.urlencoded({ extended: true }));

var student_class=require('./class');
var student=require('./student');

app.use('/class',student_class);
app.use('/student',student);

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})






