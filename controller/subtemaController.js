const express=require('express');
var router =express.Router();
var ObjectId=require('mongoose').Types.ObjectId;
var {Subtema}=require('../models/subtema');
var bodyParser = require('body-parser');

var mongo=require('mongodb');
var dbo;

var MongoClient = mongo.MongoClient;
var url= "mongodb://localhost:27017/";
///Obtener tema por codigo
router.get('/:COD_SUBTEMA', function(req,res){
    var busqueda_subtema={COD_SUBTEMA:req.params.COD_SUBTEMA};
    Subtema.find(busqueda_subtema,function(err,doc){
        if (err) return res.status(500).send("Hay un problema al encontrar el subtema");
        if (doc==null) return res.status(404).send("Subtema no encontrado") 
        else{
        res.status(200).send(doc); console.log(busqueda_subtema);
        }
    });
});


router.get('/', (req, res) => { 
    Subtema.find((err, docs) => {
        if (err) return res.status(500).send("Hay un problema al encontrar Subtema");
        if (!docs) return res.status(404).send("Subtema no encontrado");
        res.status(200).send(docs);
    });
});

//insertar un subtema
router.use(bodyParser.json());
router.put('/Nuevo/',function(req,res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        var jsonObj=req.body;
        var dbo = db.db("syllabus");

    dbo.collection("Subtema").insertOne(jsonObj, function(err, result) {
    if (err) throw err;
        console.log("1 document inserted");
        var resultado={ok: 1};
        res.setHeader('Content-Type', 'application/json');
        res.send(resultado);
        db.close();
        });
    });
});

//borrar un subtema
router.delete('/:COD_SUBTEMA', function (req, res) {
    var eliminar_subtema={COD_SUBTEMA:req.params.COD_SUBTEMA};
    Subtema.deleteOne(eliminar_subtema, function (err, subtema) {
    if (err) return res.status(500).send("Problema al borrar el subtema");
    if (!subtema) return res.status(404).send("SubTema no encontrado") 
    else{
    res.status(200).send("SubTema  borrado"); console.log(subtema)}
    });

});
module.exports = router;