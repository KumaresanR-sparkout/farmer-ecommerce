import AdminCategory from '../../models/admin-category.model'
export const availableCategory=async(farmerCategory)=>{
    const available=await AdminCategory.findOne({category:farmerCategory})
    if(!available){
        return false
    }
    return true
}
