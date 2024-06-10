import AdminCategory from '../../models/admin-category.model'
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