import express from 'express'
import upload from '../buckets/multer/upload-kyc'
import { sendFile } from '../buckets/multer/upload-kyc'
const router = express.Router()

//@POST
router.post('/upload', upload.any(), sendFile)
///@GET

//@PATCh

//@DELETE



export default router