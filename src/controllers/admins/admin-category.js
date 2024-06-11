import mongoose from 'mongoose'
import AdminCategory from '../../models/admin-category.model'
import AdminProduct from '../../models/admin-product.model'
import Product from '../../models/product.model'
import * as response from '../../utils/response-util'

export const createCategory=async(req,res)=>{
    try{
        const category=await AdminCategory.create(req.body)
        return response.sendSuccess(res,200,'category has created',category) 
    }
    catch(error){
        return response.sendError(res,500,error.message)
    }
}

export const updateCategory=async(req,res)=>{
    try{
        const category=await AdminCategory.findByIdAndUpdate(req.query.categoryId,req.body,{
            new:true
        })
        return response.sendSuccess(res,200,'category has updated',category) 
    }
    catch(error){
        return response.sendError(res,500,error.message)
    }
}

export const deleteCategory=async(req,res)=>{
    try{
        if(Object.keys(req.query).length==0){
            return response.sendError(res,400,'send id to delete')
        }
        if(!mongoose.Types.ObjectId.isValid(req.query.categoryId)){
            return response.sendError(res,400,'send valid id')
        }
        const categoryId=req.query.categoryId
        const adminCategory=await AdminCategory.findByIdAndDelete(req.query.categoryId)
        if(!adminCategory){
            return response.sendError(res,400,'no category found to delete')
        }
        const adminProduct = await AdminProduct.deleteMany({category:categoryId})
        
        if(adminProduct.deletedCount==0){
            return response.sendError(res,400,'no admin product found to delete')

        }
        const product=await Product.deleteMany({categoryId:req.query.categoryId})
        // if(product.deletedCount==0){
        //     return response.sendError(res,400,'no product found to delete')

        // }
        return response.sendSuccess(res,200,'category and releated things deleted',[])
    }
    catch(error){
        return response.sendError(res,500,error.message)
    }
}