const mongoose=require("mongoose");

var Subtema=mongoose.model('subtema',{
    COD_TEMA:{type:String},
    DESCRIPCION:{type:String}
},'Subtema');
module.exports={Subtema};