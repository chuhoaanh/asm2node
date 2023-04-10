import mongoose from "mongoose";
const schemaUser =  new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        default: "member",
    }
}
)
export default mongoose.model('User',schemaUser);
