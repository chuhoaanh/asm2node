import jwt  from "jsonwebtoken";
import User from "../models/user";
export const check = async (req, res, next)=>{
    try {
        if(!req.headers.authorization){
            return res.status(401).json({
                message: "ban chua dang nhap"
            });
        }
        const token = req.headers.authorization.split(" ")[1];
       
        const {id} = jwt.verify(token,"123456");

        const user = await User.findById(id);

        if(user && user.role !== 'admin'){
            return res.status(400).json({
                message : "ban khong co quyen"
            })

        }
        req.user = user;
        next();
        
    } catch (error) {
        return res.status(400).json({
            message : error.message
        })
    }
}