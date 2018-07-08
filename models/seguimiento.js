const mongoose=require("mongoose");

var Seguimiento=mongoose.model('seguimiento',{

    COD_SUBTEMA:{type:String},
    COD_ESTUDIANTE:{type:String},
    REVISADO:{type:String}
},'Seguimiento_Silabo');

module.exports={Seguimiento};