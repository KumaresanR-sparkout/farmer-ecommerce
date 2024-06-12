import express from 'express'
import * as farmerValidation from '../../validations/farmer-validation'
import * as farmerController from '../../controllers/signup&logins/farmer'
import * as product from '../../controllers/products/product-controller'
import * as validations from '../../validations/product-validation'
import * as validation from '../../validations/query-validation'
import * as jwt from '../../tokens/jwt-token'
const router = express.Router()

//@POST
router.post('/', farmerValidation.farmerRegister, farmerController.farmerRegister)
router.post('/product', jwt.farmerToken, validations.createProduct, product.createProduct)

//GET
router.get('/', farmerValidation.farmerLogin, farmerController.farmerLogin)
router.get('/product/lists', jwt.farmerToken, product.listProduct)
router.get('/product/details/:id', jwt.farmerToken, validation.idValidation, product.productDetails)
router.get('/product/order/:id', jwt.farmerToken, validation.idValidation, product.farmerProductOrder)
//@PUT

//@PATCH
router.patch('/:id', jwt.farmerToken, validation.idValidation, farmerValidation.farmerUpdate, farmerController.farmerUpdate)
router.patch('/product/:id', jwt.farmerToken, validation.idValidation, validations.updateProduct, product.updateProduct)
//@DELETE
router.delete('/:id', jwt.farmerToken, validation.idValidation, farmerController.farmerDelete)
router.delete('/product/:id', jwt.farmerToken, validation.idValidation, product.deleteProduct)

export default router