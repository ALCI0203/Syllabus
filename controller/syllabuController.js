const express=require('express');
var router =express.Router();
var ObjectId=require('mongoose').Types.ObjectId;
var bodyParser = require('body-parser');
var {Syllabus}=require('../models/syllabus');

/////Obtener Syllabus por codigo
router.post('/:ID', function(req,res){
    Syllabus.find(req.params.ID,function(err,doc){
        if (err) return res.status(500).send("Hay un problema al encontrar syllabus");
        if (!doc) return res.status(404).send("Syllabus no encontrado");
        res.status(200).send(doc);
    });
});

////obtener todos los syllabus
/*router.get('/', (req, res) => { 
    Syllabus.find((err, docs) => {
        if (err) return res.status(500).send("Hay un problema al encontrar syllabus");
        if (!docs) return res.status(404).send("Syllabus no encontrado");
        res.status(200).send(docs);
    });
});*/
router.use(bodyParser.urlencoded({ extended: true }));
router.put('/', function (req, res) {
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

});

module.exports = router;
