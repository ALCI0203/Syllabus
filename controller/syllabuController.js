const express=require('express');
var router =express.Router();
var ObjectId=require('mongoose').Types.ObjectId;
var bodyParser = require('body-parser');
var {Syllabus}=require('../models/syllabus');
var mongo=require('mongodb');
var dbo;

var MongoClient = mongo.MongoClient;
var url= "mongodb://localhost:27017/";


/////Obtener Syllabus por codigo
router.get('/:codigo_silabo', function(req,res){
    var busqueda_syllabus={codigo_silabo:req.params.codigo_silabo};
    Syllabus.find(busqueda_syllabus,function(err,doc){
        if (err) return res.status(500).send("Hay un problema al encontrar syllabus");
        if (doc==null) return res.status(404).send("Syllabus no encontrado") 
        else{
        res.status(200).send(doc); console.log(doc)
        }
    });
});

////obtener todos los syllabus
router.get('/', (req, res) => { 
    Syllabus.find((err, docs) => {
        if (err) return res.status(500).send("Hay un problema al encontrar syllabus");
        if (!docs) return res.status(404).send("Syllabus no encontrado");
        res.status(200).send(docs);
    });
});
router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true }));
/*router.post('/Insertar', function (req, res) {
    var jsonObj = req.body;
    console.log(jsonObj);
    (jsonObj, function(err, result) {
            if (err) return res.status(500).send("hay problema en insertar ");
            else {res.status(200).send(result);console.log(jsonObj)}
        });

});*/

router.put('/Nuevo/',function(req,res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

var jsonObj=req.body;
var dbo = db.db("syllabus");

dbo.collection("Seguimiento_Silabo").insertOne(jsonObj, function(err, result) {
  if (err) throw err;
  console.log("1 document inserted");
  console.log(jsonObj);
  var resultado={ok: 1};
  res.setHeader('Content-Type', 'application/xml');
  res.send(resultado);
  db.close();
});
});
});
/*
router.put('/', function (req, res) {
    var jsonObj = req.body;
    Syllabus.create({
        CODIGO_SILABO:req.body.CODIGO_SILABO,     
    CODIGO_ASIGNATURA:req.body.CODIGO_ASIGNATURA,
    CODIGO_PERIODO:req.body.CODIGO_PERIODO,
    DESCRIPCION:req.body.DESCRIPCION,
    FECHA_ELABORACION:req.body.FECHA_ELABORACION     
        }, 
        function (err, syl) {
            if (err) return res.status(500).send("hay problema en insertar ");
            else {res.status(200).send(syl);console.log(syl)}
        });
        console.log();

});*/





router.delete('/:id', function (req, res) {
    var eliminar_syllabus={codigo_silabo:req.params.id};
    Syllabus.deleteOne(eliminar_syllabus, function (err, syllabus) {
    if (err) return res.status(500).send("Problema al borrar el silabo");
    if (syllabus) return res.status(404).send("Syllabus no encontrado") 
    else{
    res.status(200).send("syllabus  borrado"); console.log(syllabus)}
    });

});


module.exports = router;
