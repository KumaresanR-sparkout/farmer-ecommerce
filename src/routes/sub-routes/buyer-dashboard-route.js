import express from 'express'
import * as buyer from '../../controllers/buyers/buyer-dashboard'
const router = express.Router()

//@POST


//GET
router.get('/buyer/dashboard/search',buyer.filterProducts)
router.get('/buyer/order',buyer.orderProducts)
//@PUT

//@PATCH
// router.patch('/farmer', farmerValidation.farmerUpdate, farmerController.farmerUpdate)
//@DELETE
// router.delete('/farmer', farmerValidation.farmerDelete, farmerController.farmerDelete)

export default router