import express from 'express'
import adminRouter from './admin-route'
import subAdminRouter from './sub-admin-route'
import farmerRouter from './farmer-route'
import buyerRouter from './buyer-route'
import uploadRouter from './upload-route'
import categoryRouter from './category-route'
import productRouter from './product-route'
import farmerDashboardRouter from './farmer-dashboard-route'

const router = express.Router()

router.use('/', adminRouter)
router.use('/', subAdminRouter)
router.use('/', farmerRouter)
router.use('/', buyerRouter)
router.use('/', uploadRouter)
router.use('/', categoryRouter)
router.use('/', productRouter)
router.use('/', farmerDashboardRouter)

export default router