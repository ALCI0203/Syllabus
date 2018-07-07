const express=require('express');
var router =express.Router();
var ObjectId=require('mongoose').Types.ObjectId;
var {Tema}=require('../models/tema');


router.get('/', (req, res) => { 
    Tema.find((err, docs) => {
        if (err) return res.status(500).send("Hay un problema al encontrar tema");
        if (!docs) return res.status(404).send("tema no encontrado");
    });
});
module.exports = router;