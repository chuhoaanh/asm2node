import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
const schemaProducts =  new mongoose.Schema({
    name:{
        type:String
    },
    price:{
        type:Number
    },
    categoryId:{
        type:mongoose.Types.ObjectId,
        ref:'Category',
    }
},
{timestamps :true ,versionKey:false}
)
schemaProducts.plugin(mongoosePaginate);
export default mongoose.model('Products',schemaProducts);