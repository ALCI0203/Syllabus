const express=require('express');
 var router=express.Router();
 var ObjectId=require('mongoose').Types.ObjectId;
 var {Seguimiento}=require('../models/seguimiento');
 var bodyParser = require('body-parser');

var mongo=require('mongodb');
var dbo;

var MongoClient = mongo.MongoClient;
var url= "mongodb://localhost:27017/";
///Obtener tema por codigo
router.get('/:id', function(req,res){
    
    Seguimiento.findById(req.params.id,function(err,doc){
        if (err) return res.status(500).send("Hay un problema al encontrar el seguimiento");
        if (doc==null) return res.status(404).send("Seguimiento no encontrado") 
        else{
        res.status(200).send(doc); console.log(doc);
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

    dbo.collection("Seguimiento_Silabo").insertOne(jsonObj, function(err, result) {
    if (err) throw err;
        console.log("1 document inserted");
        var resultado={ok: 1};
        res.setHeader('Content-Type', 'application/json');
        res.send(resultado);
        db.close();
        });
    });
});



router.get('/', (req, res) => { 
    Seguimiento.find((err, docs) => {
        if (err) return res.status(500).send("Hay un problema al encontrar el seguimiento");
        if (!docs) return res.status(404).send("Seguimiento no encontrada");
        res.status(200).send(docs);
    });
});
router.post('/:id', function (req, res) {
  
    Seguimiento.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) {console.log(user);
        return res.status(500).send("There was a problem updating the seguimiento");}                   
        else res.status(200).send(user);
       
    });

});

module.exports=router;


