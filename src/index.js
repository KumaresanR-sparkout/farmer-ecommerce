import express from 'express'
import env from 'dotenv'
import helmet from 'helmet'
import cluster from 'cluster'
import os from 'os'
import mainRouter from './routes/main-routes/common-route'
import { dbConnection } from './config/dbConfig'
import { apiRateLimit } from './utils/api-rate-limit'
import { sendNotification } from '../src/cron/schedule.cron'

env.config()
const CPUS = os.cpus().length
const app = express()

app.use(express.json())
app.use(helmet())
app.use(apiRateLimit())

dbConnection()
sendNotification()

app.use('/api/ecom/v1', mainRouter)

if (cluster.isPrimary) {
    console.log(`master cpu-core of ${process.pid} is running`)
    for (let i = 0; i < CPUS; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`process killed at ${worker.process.pid}`)
        cluster.fork()
    })
}
else {
    app.listen(process.env.PORT, () => {
        console.log(`server started at port:${process.env.PORT}`)
    })
}

