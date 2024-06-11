import express from 'express'
import adminRouter from '../sub-routes/admin-route'
import farmerRouter from '../sub-routes/farmer-route'
import buyerRouter from '../sub-routes/buyer-route'
import uploadRouter from '../sub-routes/upload-route'

const router = express.Router()

router.use('/admin', adminRouter)
router.use('/farmer', farmerRouter)
router.use('/buyer', buyerRouter)
router.use('/upload', uploadRouter)

export default router