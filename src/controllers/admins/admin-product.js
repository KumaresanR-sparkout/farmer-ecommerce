import AdminProduct from '../../models/admin-product.model'
import * as response from '../../utils/response-util'

export const createProduct=async(req,res)=>{
    try{
        const product=await AdminProduct.create(req.body)
        return response.sendSuccess(res,200,'category has created',[product]) 
    }
    catch(error){
        return response.sendError(res,500,error.message)
    }
}

export const updateProduct=async(req,res)=>{
    try{
        const product=await AdminProduct.findByIdAndUpdate(req.query.productId,req.body,{
            new:true
        })
        return response.sendSuccess(res,200,'product has updated',[product]) 
    }
    catch(error){
        return response.sendError(res,500,error.message)
    }
}