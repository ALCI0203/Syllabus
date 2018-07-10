const mongoose=require("mongoose");

var Seguimiento=mongoose.model('seguimiento',{
    COD_ESTUDIANTE:{type:String},
    REVISADO:{type:String}
},'Seguimiento_Silabo');

module.exports={Seguimiento};