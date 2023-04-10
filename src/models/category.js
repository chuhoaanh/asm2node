import mongoose from "mongoose";
const schemaCategory =  new mongoose.Schema({
    name:{
        type:String,
    },
    products:[
        {type:mongoose.Types.ObjectId ,ref:'Products'}],
},
{timestamps:true , versionKey:false}
)
export default mongoose.model('Category',schemaCategory);