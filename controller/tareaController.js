const express=require('express');
var router =express.Router();
var ObjectId=require('mongoose').Types.ObjectId;
var {Tarea}=require('../models/tarea');
var bodyParser = require('body-parser');

var mongo=require('mongodb');
var dbo;

var MongoClient = mongo.MongoClient;
var url= "mongodb://localhost:27017/";
///Obtener tema por codigo
router.get('/:COD_TAREA', function(req,res){
    var busqueda_tarea={COD_TAREA:req.params.COD_TAREA};
    Tarea.find(busqueda_tarea,function(err,doc){
        if (err) return res.status(500).send("Hay un problema al encontrar la tarea");
        if (doc==null) return res.status(404).send("Tarea no encontrado") 
        else{
        res.status(200).send(doc); console.log(busqueda_subtema);
        }
    });
});

//insertar un subtema
router.use(bodyParser.json());
router.put('/Nuevo/',function(req,res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        var jsonObj=req.body;
        var dbo = db.db("syllabus");

    dbo.collection("Tarea").insertOne(jsonObj, function(err, result) {
    if (err) throw err;
        console.log("1 document inserted");
        var resultado={ok: 1};
        res.setHeader('Content-Type', 'application/json');
        res.send(resultado);
        db.close();
        });
    });
});

//borrar una Tarea
router.delete('/:COD_TAREA', function (req, res) {
    var eliminar_tarea={COD_TAREA:req.params.COD_TAREA};
    Tarea.deleteOne(eliminar_tarea, function (err, tarea) {
    if (err) return res.status(500).send("Problema al borrar la tarea");
    if (!tarea) return res.status(404).send("Tarea no encontrada") 
    else{
    res.status(200).send("Tarea borrada"); console.log(tarea)}
    });

});

router.get('/', (req, res) => { 
    Tarea.find((err, docs) => {
        if (err) return res.status(500).send("Hay un problema al encontrar la tarea");
        if (!docs) return res.status(404).send("Tarea no encontrada");
        res.status(200).send(docs);
    });
});
module.exports=router;


