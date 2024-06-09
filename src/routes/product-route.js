import express from 'express'
import * as product from '../controllers/products/product-controller'
import * as validations from '../validations/product-validation'
const router = express.Router()

//@POST
router.post('/product', validations.createProduct, product.createProduct)

//@GET
router.get('/product/lists', product.listProduct)
router.get('/product/details', product.productDetails)
//@PUT
router.patch('/product', validations.updateProduct, product.updateProduct)
//@DELETE 
router.delete('/product', product.deleteProduct)

export default router