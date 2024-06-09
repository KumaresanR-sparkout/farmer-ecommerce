import express from 'express'
import * as buyerController from '../controllers/signup&logins/buyer'
import * as buyerValidation from '../validations/buyer-validation'
import * as jwt from '../tokens/jwt-token'
const router = express.Router()

//@POST
router.post('/buyer', buyerValidation.buyerRegister, buyerController.buyerRegister)
//@GET
router.get('/buyer', buyerValidation.buyerLogin, buyerController.buyerLogin)
//@PUT
router.patch('/buyer', jwt.buyerToken, buyerValidation.buyerUpdate, buyerController.buyerUpdate)
//@DELETE
router.delete('/buyer', jwt.buyerToken, buyerValidation.buyerDelete, buyerController.buyerDelete)

export default router