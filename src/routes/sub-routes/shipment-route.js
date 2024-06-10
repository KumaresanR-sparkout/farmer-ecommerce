import express from 'express'
import * as shipment from '../../controllers/shipment/shipment-admin'
import * as jwt from '../../tokens/jwt-token'
const router = express.Router()

//@POST
router.post('/admin/shipment', jwt.adminToken, shipment.createShipment)
//@GET

//@PATCH

//@DELETE
router.delete('/admin/shipment', jwt.adminToken, shipment.deleteShipment)

export default router