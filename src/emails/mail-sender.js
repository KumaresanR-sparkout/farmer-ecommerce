import nodemailer from 'nodemailer'
import env from 'dotenv'
env.config()

export const sendEmail = async (toEmail, subject, template) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        }
    })

    const maildetails = {
        from: process.env.USER,
        to: process.env.USER,
        subject: subject,
        html: template
    }

    const emailResponse = await transporter.sendMail(maildetails)

    if (!emailResponse) {
        console.log('Error in email sending')
    }
    else {
        console.log('Email sended for provider customer')
    }
}