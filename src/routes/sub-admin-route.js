import express from 'express'
import * as subAdminValidation from '../validations/sub-admin-validation'
import * as roleMiddleware from '../middlewares/role-middleware'
import * as subAdminController from '../controllers/signup&logins/sub-admin'
const router = express.Router()

//@POST


//GET
router.get('/sub-admin/user', roleMiddleware.subAdmin, subAdminValidation.SubAdminLogin, subAdminController.subAdminRegister)
//@PUT

//@PATCH
router.patch('/sub-admin/user', subAdminValidation.SubAdminUpdate, subAdminController.subAdminUpdate)
//@DELETE
router.delete('/sub-admin/user', subAdminValidation.SubAdminDelete, subAdminController.subAdminDelete)

export default router