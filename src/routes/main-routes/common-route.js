import express from 'express'
import adminRouter from '../sub-routes/admin-route'
import subAdminRouter from '../sub-routes/sub-admin-route'
import farmerRouter from '../sub-routes/farmer-route'
import buyerRouter from '../sub-routes/buyer-route'
import uploadRouter from '../sub-routes/upload-route'
import categoryRouter from '../sub-routes/category-route'
import productRouter from '../sub-routes/product-route'
import farmerDashboardRouter from '../sub-routes/farmer-dashboard-route'
import buyerDashboardRouter from '../sub-routes/buyer-dashboard-route'
import shipmentRouter from '../sub-routes/shipment-route'

const router = express.Router()

router.use('/', adminRouter)
router.use('/', subAdminRouter)
router.use('/', farmerRouter)
router.use('/', buyerRouter)
router.use('/', uploadRouter)
router.use('/', categoryRouter)
router.use('/', productRouter)
router.use('/', farmerDashboardRouter)
router.use('/', buyerDashboardRouter)
router.use('/',shipmentRouter)

export default router