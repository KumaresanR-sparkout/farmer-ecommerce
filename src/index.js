import express from 'express'
import env from 'dotenv'
import helmet from 'helmet'
import { dbConnection } from './config/dbConfig'
import mainRouter from './routes/main-routes/common-route'
env.config()

const app = express()

app.use(express.json())
app.use(helmet())

dbConnection()

app.use('/api/ecom/v1', mainRouter)

app.listen(process.env.PORT, () => {
    console.log(`server started at port:${process.env.PORT}`)
})