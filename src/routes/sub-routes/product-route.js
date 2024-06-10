import express from 'express'
import * as product from '../../controllers/products/product-controller'
import * as validations from '../../validations/product-validation'
import * as jwt from '../../tokens/jwt-token'
const router = express.Router()

//@POST
router.post('/product', jwt.farmerToken, validations.createProduct, product.createProduct)

//@GET
router.get('/product/lists', jwt.farmerToken, product.listProduct)
router.get('/product/details', jwt.farmerToken, product.productDetails)
//@PUT
router.patch('/product', jwt.farmerToken, validations.updateProduct, product.updateProduct)
//@DELETE 
router.delete('/product', jwt.farmerToken, product.deleteProduct)

export default router