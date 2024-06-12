import express from 'express'
import uploadBuyerKYC from '../../buckets/multer/buyer-kyc'
import uploadProductKYC from '../../buckets/multer/product-kyc'
import { updateBuyerKYC } from '../../buckets/multer/buyer-kyc'
import { updateProductKyc } from '../../buckets/multer/product-kyc'
import * as validation from '../../validations/query-validation'
const router = express.Router()

//@POST
router.post('/buyer/:id', validation.idValidation, uploadBuyerKYC.any(), updateBuyerKYC)
router.post('/product/:id', validation.idValidation, uploadProductKYC.any(), updateProductKyc)
///@GET

//@PATCh

//@DELETE



export default router