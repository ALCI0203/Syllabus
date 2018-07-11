const mongoose =require("mongoose");

var Tema=mongoose.model('tema',{
    COD_SILABO:{type:String},
    NOMBRE:{type:String},
    DESCRIPCION:{type:String},
    FECHA_INICIO:{type:Date},
    FECHA_FIN:{type:Date},
    ESTADO:{type:String}
},'Tema');
module.exports={Tema};