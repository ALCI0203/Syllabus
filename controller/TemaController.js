const express=require('express');
var router =express.Router();
var ObjectId=require('mongoose').Types.ObjectId;
var {Tema}=require('../models/tema');
var bodyParser = require('body-parser');

var mongo=require('mongodb');
var dbo;

var MongoClient = mongo.MongoClient;
var url= "mongodb://localhost:27017/";
///Obtener tema por codigo
router.get('/:COD_TEMA', function(req,res){
    var busqueda_tema={COD_TEMA:req.params.COD_TEMA};
    Tema.find(busqueda_tema,function(err,doc){
        if (err) return res.status(500).send("Hay un problema al encontrar el tema");
        if (doc==null) return res.status(404).send("Syllabus no encontrado") 
        else{
        res.status(200).send(doc); console.log(busqueda_tema);
        }
    });
});

router.get('/', (req, res) => { 
    Tema.find((err, docs) => {
        if (err) return res.status(500).send("Hay un problema al encontrar tema");
        if (!docs) return res.status(404).send("tema no encontrado");
        res.status(200).send(docs);
    });
});

//insertar un tema
router.use(bodyParser.json());
router.put('/Nuevo/',function(req,res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        var jsonObj=req.body;
        var dbo = db.db("syllabus");

    dbo.collection("Tema").insertOne(jsonObj, function(err, result) {
    if (err) throw err;
        console.log("1 document inserted");
        var resultado={ok: 1};
        res.setHeader('Content-Type', 'application/json');
        res.send(resultado);
        db.close();
        });
    });
});

//borrar un tema
router.delete('/:COD_TEMA', function (req, res) {
    var eliminar_tema={COD_TEMA:req.params.COD_TEMA};
    Tema.deleteOne(eliminar_tema, function (err, tema) {
    if (err) return res.status(500).send("Problema al borrar el silabo");
    if (!tema) return res.status(404).send("Tema no encontrado") 
    else{
    res.status(200).send("Tema  borrado"); console.log(tema)}
    });

});


module.exports = router;