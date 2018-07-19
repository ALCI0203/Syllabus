const express=require('express');
var router =express.Router();
var ObjectId=require('mongoose').Types.ObjectId;
var bodyParser = require('body-parser');
var {Syllabus}=require('../models/syllabus');

var mongo=require('mongodb');
var dbo;

var MongoClient = mongo.MongoClient;
var url= "mongodb://localhost:27017/";

var busqueda_syllabus;
/////Obtener Syllabus por codigo
router.get('/:id', function(req,res){
    
    Syllabus.findById(req.params.id,function(err,doc){
        if (err) return res.status(500).send("Hay un problema al encontrar syllabus");
        if (!doc) return res.status(404).send("Syllabus no encontrado") 
        else{
        res.status(200).send(doc); console.log(doc)
        }
    });
});
router.post('/', function (req, res) {
  console.log(req.body._id);
    Syllabus.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, doc) {
        if (err) {console.log(doc);
        return res.status(500).send("There was a problem updating the seguimiento");}
        else res.status(200).send(doc);      
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


router.put('/',function(req,res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        var jsonObj=req.body;
        var dbo = db.db("syllabus");

        dbo.collection("Silabo").insertOne(jsonObj, function(err, result) {
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

    Syllabus.findByIdAndRemove(req.params.id, function (err, syllabus) {
    if (err) return res.status(500).send("Problema al borrar el sylabus");
    if (!syllabus) return res.status(404).send("Syllabus no encontrado") 
    else{
    res.status(200).send("syllabus  borrado"); console.log(syllabus)}
    });

});


module.exports = router;
