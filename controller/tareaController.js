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
router.get('/:COD_SUBTEMA', function(req,res){
    var buscar_t={COD_SUBTEMA:req.params.COD_SUBTEMA}
    Tarea.find(buscar_t,function(err,doc){
        if (err) return res.status(500).send("Hay un problema al encontrar la tarea");
        if (!doc) return res.status(404).send("Tarea no encontrado") 
        else{
        res.status(200).send(doc); 
        }
    });
});

//insertar un subtema
router.use(bodyParser.json());
router.put('/',function(req,res){
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
router.delete('/:id', function (req, res) {
    Tarea.findByIdAndRemove(req.params.id, function (err, tarea) {
    if (err) return res.status(500).send("Problema al borrar la tarea");
    if (!tarea) return res.status(404).send("Tarea no encontrada") 
    else{
    res.status(200).send("Tarea borrada");}
    });

});

router.get('/', (req, res) => { 
    Tarea.find((err, docs) => {
        if (err) return res.status(500).send("Hay un problema al encontrar la tarea");
        if (!docs) return res.status(404).send("Tarea no encontrada");
        res.status(200).send(docs);
    });
});
router.post('/:id', function (req, res) {
   
    Tarea.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, doc) {
        if (err) {console.log(doc);
        return res.status(500).send("There was a problem updating the seguimiento");}
        else res.status(200).send(doc);
       
    });

});
module.exports=router;


