import express from 'express'
import * as buyer from '../../controllers/buyers/buyer-dashboard'
import * as jwt from '../../tokens/jwt-token'
const router = express.Router()

//@POST

//GET
router.get('/buyer/dashboard/search', jwt.buyerToken, buyer.filterProducts)
router.get('/buyer/order', jwt.buyerToken, buyer.orderProducts)
router.get('/buyer/product',jwt.buyerToken,buyer.productDetails)
//@PUT

//@PATCH

//@DELETE


export default router