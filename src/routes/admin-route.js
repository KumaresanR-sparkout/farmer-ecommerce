import express from 'express'
import * as adminValidation from '../validations/admin-validation'
import * as subAdminValidation from '../validations/sub-admin-validation'
import * as roleMiddleware from '../middlewares/role-middleware'
import * as adminController from '../controllers/signup&logins/admin'
import * as subAdminController from '../controllers/signup&logins/sub-admin'
const router = express.Router()

//@POST
router.post('/admin/user', roleMiddleware.admin, adminValidation.adminRegister, adminController.adminRegister)
router.post('/admin/subadmin', roleMiddleware.subAdmin, subAdminValidation.SubAdminRegister, subAdminController.subAdminRegister)

//GET
router.get('/admin/user', roleMiddleware.admin, adminValidation.adminLogin, adminController.adminLogin)
//@PUT

//@PATCH
router.patch('/admin/user', adminValidation.adminUpdate, adminController.adminUpdate)
//@DELETE
router.delete('/admin/user', adminValidation.adminDelete, adminController.adminDelete)
export default router