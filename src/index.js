import express from 'express'
import env from 'dotenv'
import helmet from 'helmet'
import { dbConnection } from './config/dbConfig'
import adminRouter from './routes/admin-route'
import subAdminRouter from './routes/sub-admin-route'
import farmerRouter from './routes/farmer-route'
env.config()
const app = express()

app.use(express.json())
app.use(helmet())

dbConnection()

app.use('/api/ecom/v1',adminRouter)
app.use('/api/ecom/v1',subAdminRouter)
app.use('/api/ecom/v1',farmerRouter)

app.listen(process.env.PORT, () => {
    console.log(`server started at port:${process.env.PORT}`)
})