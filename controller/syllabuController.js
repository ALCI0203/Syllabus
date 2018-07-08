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
        res.setHeader('Content-Type', 'application/json');
        res.send(resultado);
        db.close();
        });
    });
});





router.delete('/:id', function (req, res) {
    var eliminar_syllabus={codigo_silabo:req.params.id};
    Syllabus.deleteOne(eliminar_syllabus, function (err, syllabus) {
    if (err) return res.status(500).send("Problema al borrar el sylabus");
    if (syllabus) return res.status(404).send("Syllabus no encontrado") 
    else{
    res.status(200).send("syllabus  borrado"); console.log(syllabus)}
    });

});

router.post('/:id', function (req, res) {
    var buscar_t={codigo_silabo:req.params.id};
    //console.log(buscar_t);
            //
    Syllabus.findOneAndUpdate(buscar_t, req.body, {new: true}, function (err, doc) {
        if (err) {console.log(doc);
        return res.status(500).send("There was a problem updating the seguimiento");}
        else res.status(200).send(doc);
       
    });

});
module.exports = router;
