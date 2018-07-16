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
router.get('/:COD_SILABO', function(req,res){
    var buscar_t={COD_SILABO:req.params.COD_SILABO};
    Tema.find(buscar_t,function(err,doc){
        if (err) return res.status(500).send("Hay un problema al encontrar el tema");
        if (!doc) return res.status(404).send("Tema no encontrado") 
        else{
        res.status(200).send(doc); console.log(busqueda_tema);
        }
    });
});

router.post('/', function (req, res) {
    Tema.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, doc) {
        if (err) {console.log(doc);
        return res.status(500).send("There was a problem updating the seguimiento");}
        else res.status(200).send(doc);
       
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
router.put('/',function(req,res){
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
router.delete('/:id', function (req, res) {

    Tema.findByIdAndRemove(req.params.id, function (err, tema) {
    if (err) return res.status(500).send("Problema al borrar el tema");
    if (!tema) return res.status(404).send("Tema no encontrado") 
    else{
    res.status(200).send("Tema  borrado");}
    });

});

module.exports = router;