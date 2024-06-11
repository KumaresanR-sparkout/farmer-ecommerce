import express from 'express'
import * as buyerController from '../../controllers/signup&logins/buyer'
import * as buyerValidation from '../../validations/buyer-validation'
import * as buyer from '../../controllers/buyers/buyer-dashboard'
import * as jwt from '../../tokens/jwt-token'
const router = express.Router()

//@POST
router.post('/', buyerValidation.buyerRegister, buyerController.buyerRegister)

//@GET
router.get('/', buyerValidation.buyerLogin, buyerController.buyerLogin)
router.get('/dashboard/search', jwt.buyerToken, buyer.filterProducts)
router.get('/order', jwt.buyerToken, buyer.orderProducts)
router.get('/product', jwt.buyerToken, buyer.productDetails)
router.get('/order/list', jwt.buyerToken, buyer.buyerOrders)

//@PATCH
router.patch('/', jwt.buyerToken, buyerValidation.buyerUpdate, buyerController.buyerUpdate)

//@DELETE
router.delete('/', jwt.buyerToken, buyerValidation.buyerDelete, buyerController.buyerDelete)

export default router