import User from "../models/user";
import bcrypt from "bcryptjs"
import { SinginSchem, SingupSchem } from "../schemas/auth";
import jwt from "jsonwebtoken";
export const singup = async(req,res)=>{
    try {
        const {error} =  SingupSchem.validate(req.body,{abortEarly: false});
        if(error){
            return res.status(400).json({
                message :error.details.map((err)=> err.message)
            })
        }
        // console.log(req.body);
        // kiem tra email co ton tai khong
        const userExist = await User.findOne({email :req.body.email});
        // console.log({email :req.body.email})
        if(userExist){
            return res.status(400).json({
                message : "email da ton tai"
            })
        }
        // ma hoa mk
        const hashePassword = await bcrypt.hash(req.body.password,10 );
        // ma hoa token
        // them vao json --server
        const uers = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashePassword,
        })
        console.log(uers)
        return res.status(201).json({
            message : "them thanh cong",
            uers
        });
        
    } catch (error) {
        return res.status(400).json({
            message : error.message
        })
    }
}
export const singin = async(req,res)=>{
    try {
        const {error} = SinginSchem.validate(req.body,{abortEarly: false});
        if(error){
            return res.status(400).json({
                message :error.details.map((err)=> err.message)
            })
        }
        // kiem tra email day duoc dang ky chua
        const user = await User.findOne({email : req.body.email});
        // console.log({email :req.body.email})
        if(!user){
            return res.status(400).json({
                message : "email khong ton tai"
            })
        }
        // kiem tra mat khau
        const Password =  await bcrypt.compare(req.body.password, user.password );
        if(!Password){
            return res.status(400).json({
                message : "Sai mat khau",
            })
        }
        // tao ma token
        const token = jwt.sign({ id: user._id },"123456", { expiresIn: "1d" });
        // khong hien thi mat khau
        user.password= undefined;
        return res.status(201).json({
            message : "them thanh cong",
            accessToken: token,
            user,
        });
    } catch (error) {
        return res.status(400).json({
            message : error.message
        })
    }
}
