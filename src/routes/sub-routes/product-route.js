import express from 'express'
import * as product from '../../controllers/products/product-controller'
import * as validations from '../../validations/product-validation'
import * as jwt from '../../tokens/jwt-token'
const router = express.Router()

//@POST
router.post('/farmer/product', jwt.farmerToken, validations.createProduct, product.createProduct)

//@GET
router.get('/farmer/product/lists', jwt.farmerToken, product.listProduct)
router.get('/farmer/product/details', jwt.farmerToken, product.productDetails)
router.get('/farmer/product/order',jwt.farmerToken,product.farmerProductOrder)
//@PUT
router.patch('/farmer/product', jwt.farmerToken, validations.updateProduct, product.updateProduct)
//@DELETE 
router.delete('/farmer/product', jwt.farmerToken, product.deleteProduct)

export default router