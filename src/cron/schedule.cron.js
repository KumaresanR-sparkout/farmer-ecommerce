import cron from 'node-cron'
import Order from '../models/order.model'
import Product from '../models/product.model'
import { sendEmail } from '../emails/mail-sender'
import { notificationTempalte } from '../emails/templates/notification-template'

export const sendNotification = () => {
    cron.schedule('0 0 * * 0', async () => {
        console.log('cron running')
        let date = new Date();
        date.setDate(date.getDate() - 7)

        const product = await Product.find({ updatedAt: { $gte: date } }, { _id: 0, farmer_id: 1, category_id: 1 })
        const buyer = await Order.find({ $or: product }, { _id: 0, buyer_email: 1 })

        buyer.forEach(data => {
            sendEmail(data.buyer_email, 'New product arrival', notificationTempalte())
        })
    })
}