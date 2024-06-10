import express from 'express'
import * as buyerController from '../../controllers/signup&logins/buyer'
import * as buyerValidation from '../../validations/buyer-validation'
import * as buyerManagement from '../../controllers/buyers/buyer-management'
import * as jwt from '../../tokens/jwt-token'
const router = express.Router()

//@POST
router.post('/buyer', buyerValidation.buyerRegister, buyerController.buyerRegister)
//@GET
router.get('/buyer', buyerValidation.buyerLogin, buyerController.buyerLogin)
// router.get('/buyer/pending',jwt.adminToken,buyerManagement.pendingKYCBuyers)
// router.get('/buyer/lists',jwt.adminToken,buyerManagement.allBuyers)
// router.get('/buyer/details',jwt.adminToken,buyerManagement.BuyerDetails)
// router.get('/buyer/search',jwt.adminToken,buyerManagement.buyerSearch)

//@PATCH
router.patch('/buyer', jwt.buyerToken, buyerValidation.buyerUpdate, buyerController.buyerUpdate)
//router.patch('/buyer/kyc',jwt.adminToken,buyerManagement.buyerKYCProcess)
//@DELETE
router.delete('/buyer', jwt.buyerToken , buyerValidation.buyerDelete, buyerController.buyerDelete)

export default router