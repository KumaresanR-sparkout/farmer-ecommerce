import express from 'express'
import * as farmerValidation from '../../validations/farmer-validation'
import * as farmerController from '../../controllers/signup&logins/farmer'
import * as product from '../../controllers/products/product-controller'
import * as validations from '../../validations/product-validation'
import * as jwt from '../../tokens/jwt-token'
const router = express.Router()

//@POST
router.post('/', farmerValidation.farmerRegister, farmerController.farmerRegister)
router.post('/product', jwt.farmerToken, validations.createProduct, product.createProduct)

//GET
router.get('/', farmerValidation.farmerLogin, farmerController.farmerLogin)
router.get('/product/lists', jwt.farmerToken, product.listProduct)
router.get('/product/details', jwt.farmerToken, product.productDetails)
router.get('/product/order',jwt.farmerToken,product.farmerProductOrder)
//@PUT

//@PATCH
router.patch('/', jwt.farmerToken, farmerValidation.farmerUpdate, farmerController.farmerUpdate)
router.patch('/product', jwt.farmerToken, validations.updateProduct, product.updateProduct)
//@DELETE
router.delete('/', jwt.farmerToken, farmerValidation.farmerDelete, farmerController.farmerDelete)
router.delete('/product', jwt.farmerToken, product.deleteProduct)

export default router