const mongoose=require('mongoose');

var Syllabus=mongoose.model('syllabus',{
    CODIGO_SILABO:{type:String},
    CODIGO_ASIGNATURA:{type:String},
    CODIGO_PERIODO:{type:String},
    DESCRIPCION:{type:String},
    FECHA_ELABORACION:{type:String}

},'silabo');

module.exports={Syllabus};