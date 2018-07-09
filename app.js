const express=require("express");
const bodyParser=require("body-parser");
const {mongoose}=require("./db.js");

var syllabuController=require("./controller/syllabuController.js");
var TemaController=require("./controller/TemaController.js");
var subtemaController=require("./controller/subtemaController.js");
var tareaController=require('./controller/tareaController.js');
var seguimientoController=require('./controller/seguimientoController.js');
var app= express();
app.use(bodyParser.json());
app.listen(3000,()=>console.log("Servidor iniciado"))
app.use('/tema',TemaController);
app.use('/syllabus',syllabuController);
app.use('/subtema',subtemaController);
app.use('/tarea',tareaController);
app.use('/seguimiento',seguimientoController);
//app.use(bodyParser.json());
//////middlewares
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});