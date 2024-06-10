import AdminProduct from '../../models/admin-product.model'
export const availableProduct = async (farmerProduct) => {
    const available = await AdminProduct.findOne({ product: farmerProduct })
    if (!available) {
        return false
    }
    return true
}
