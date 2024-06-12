import express from 'express'
import * as buyerController from '../../controllers/signup&logins/buyer'
import * as buyerValidation from '../../validations/buyer-validation'
import * as buyer from '../../controllers/buyers/buyer-dashboard'
import * as jwt from '../../tokens/jwt-token'
import * as validation from '../../validations/query-validation'
const router = express.Router()

//@POST
router.post('/', buyerValidation.buyerRegister, buyerController.buyerRegister)

//@GET
router.get('/', buyerValidation.buyerLogin, buyerController.buyerLogin)
router.get('/dashboard/search', jwt.buyerToken, buyer.filterProducts)
router.get('/order/:id', jwt.buyerToken, validation.idValidation, buyerValidation.buyerOrderValidation, buyer.orderProducts)
router.get('/product', jwt.buyerToken, buyer.productDetails)
router.get('/order/list/:id', jwt.buyerToken, validation.idValidation, buyer.buyerOrders)

//@PATCH
router.patch('/:id', jwt.buyerToken, validation.idValidation, buyerValidation.buyerUpdate, buyerController.buyerUpdate)

//@DELETE
router.delete('/:id', jwt.buyerToken, validation.idValidation, buyerController.buyerDelete)

export default router