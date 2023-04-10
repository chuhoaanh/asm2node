import Products from "../models/product";
import Category from "../models/category";
import { Productschems } from "../schemas/product";

export const getAll = async (req, res)=>{
     const {_page = 1 , _order="asc", _limit =10,_sort='createAt'} = req.query;
     const options ={
        page : _page,
        limit: _limit,
        _sort:{
            [_sort]: _order == "desc"? -1 : 1,
        }
     }
    try {

        const products =  await Products.paginate({}, options);
        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
        
    }
}
export const get = async (req, res)=>{
    
    try {
        const product = await Products.findById(req.params.id).populate('categoryId','products');
        console.log(product)
        return res.status(200).json(product)
        
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
        
    }
}
export const create = async (req, res)=>{
    try {
        const {error} = Productschems.validate( req.body,{ abortEarly : false});
        if(error){
            return res.status(400).json({
                message : error.details.map(err =>{err.message})
            })
        }
        const product = await Products.create(req.body);
        // goi vao
        await Category.findOneAndUpdate(product.categoryId,{
            $addToSet:{
                products :product._id
            },
        })

        return res.status(201).json(product)
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
            
        }
}
export const remove = async (req, res)=>{
    try {
        const product = await Products.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message : 'xoa thanh cong'
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
        
    }
}
export const update = async (req, res)=>{
    try {
        const product = await Products.findByIdAndUpdate(req.params.id , req.body, {new:true});
        return res.status(200).json({
            product
        })
        
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
        
    }
}