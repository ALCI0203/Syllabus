const mongoose=require('mongoose');

var Syllabus=mongoose.model('syllabus',{
    CODIGO_ASIGNATURA:{type:String},
    CODIGO_PERIODO:{type:String},
    DESCRIPCION:{type:String},
    FECHA_ELABORACION:{type:String}

},'Silabo');

module.exports={Syllabus};
    
/*const mongoose = require('mongoose');  
var Syllabus = new mongoose.Schema({  
    CODIGO_SILABO:String,
    CODIGO_ASIGNATURA:String,
    CODIGO_PERIODO:String,
    DESCRIPCION:String,
    FECHA_ELABORACION:String
});
mongoose.model('Seguimiento_Syllabus', Syllabus);

module.exports = mongoose.model('syllabus');*/