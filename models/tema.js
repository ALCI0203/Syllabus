const mongoose =require("mongoose");

var Tema=mongoose.model('tema',{
    COD_SILABO:{type:String},
    NOMBRE:{type:String},
    DESCRIPCION:{type:String},
    FECHA_INICIO:{type:String},
    FECHA_FIN:{type:String},
    ESTADO:{type:String}
},'Tema');
module.exports={Tema};