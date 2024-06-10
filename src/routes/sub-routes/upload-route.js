import express from 'express'
import uploadBuyerKYC from '../../buckets/multer/buyer-kyc'
import uploadProductKYC from '../../buckets/multer/product-kyc'
import { updateBuyerKYC } from '../../buckets/multer/buyer-kyc'
import { updateProductKyc } from '../../buckets/multer/product-kyc'
const router = express.Router()

//@POST
router.post('/upload/buyer',uploadBuyerKYC.any(), updateBuyerKYC)
router.post('/upload/product', uploadProductKYC.any(), updateProductKyc)
///@GET

//@PATCh

//@DELETE



export default router