const express=require("express");
const bodyParser=require("body-parser");
const {mongoose}=require("./db.js");

var syllabuController=require("./controller/syllabuController.js");

var app= express();
app.use(bodyParser.json());
app.listen(3000,()=>console.log("Servidor iniciado"))
app.use('/syllabus',syllabuController);