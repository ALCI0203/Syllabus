const express=require('express');
 var router=express.Router();
 var ObjectId=require('mongoose').Types.ObjectId;
 var {Seguimiento}=require('../models/seguimiento');
 var bodyParser = require('body-parser');
 var {Tarea}=require('../models/tarea');
var mongo=require('mongodb');
var dbo;

var MongoClient = mongo.MongoClient;
var url= "mongodb://localhost:27017/";
///Obtener tema por codigo

router.get('/:id', function(req,res){
   
    Seguimiento.findById(req.params.id,function(err,doc){
        if (err) return res.status(500).send("Hay un problema al encontrar el seguimiento");
        if (!doc) return res.status(404).send("Seguimiento no encontrado") 
        else{
        res.status(200).send(doc); console.log(doc);
        }
    });
});

router.get('/buscartarea/:COD_ESTUDIANTE', function(req,res){
    router.use(bodyParser.json());
    //var jsonObj;
    //consol.log(req.params.COD_SUBTEMA);
    var buscar_t={COD_ESTUDIANTE:req.params.COD_ESTUDIANTE};
    Seguimiento.find(buscar_t,function(err,doc){
    //console.log(doc[0].cod);
    console.log(doc);
    
    if (err) return res.status(500).send("Hay un problema al encontrar el seguimiento");
            if (!doc) return res.status(404).send("Seguimiento no encontrado");
            else{
           // res.status(200).send(doc); 
           
          // var buscar_t1=doc[0].COD_SUBTEMA;
          console.log(doc[0]);
        Tarea.find(doc[0][1],function(err1,doc1){
           // console.log(doc[0].COD_SUBTEMA);
            if (err1) return res.status(500).send("Hay un problema al encontrar el seguimiento");
            if (!doc1) return res.status(404).send("Seguimiento no encontrado") 
            else{
            res.status(200).send(doc1); console.log(doc1);
            }
       });
    }
    });
});

//insertar un subtema

router.put('/',function(req,res){
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
router.post('/', function (req, res) {
    //var buscar_t={COD_SUBTEMA:req.params.COD_SUBTEMA};
    Seguimiento.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, user) {
        if (err) {console.log(user);
        return res.status(500).send("There was a problem updating the seguimiento");}                   
        else res.status(200).send(user);
       
    });

});

/*router.get('/:COD_ESTUDIANTE', function(req,res){
    var buscar_t={COD_ESTUDIANTE:req.params.COD_ESTUDIANTE}
    Seguimiento.find(buscar_t,function(err,doc){
        if (err) return res.status(500).send("Hay un problema al encontrar el seguimiento");
        if (!doc) return res.status(404).send("Seguimiento no encontrado") 
        else{
        res.status(200).send(doc); console.log(doc);
        }
    });
});*/



module.exports=router;


