const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/syllabus", err=>{
    if(!err)
        console.log("Coneccion establecida MONGODB");
    else
        console.log("Error  "+ JSON.stringify(err,undefined,2));

});
module.export=mongoose;
