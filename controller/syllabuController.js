const express=require('express');
var router =express.Router();
var ObjectId=require('mongoose').Types.ObjectId;
var {Syllabus}=require('../models/syllabus');

/////Obtener Syllabus por codigo
router.get('/:codigo', (req,res) => {
    Syllabus.find({"codigo":req.params.codigo},(err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error'+JSON.stringify(err,undefined,2));}
    });
});
module.exports = router;
