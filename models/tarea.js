const mongoose=require("mongoose");

var Tarea=mongoose.model('tarea',{

    COD_TAREA:{type:String},
    COD_SUBTEMA:{type:String},
    DESCRIPCION:{type:String},
    PONDERACION:{type:String}
},'Tarea');

module.exports={Tarea};