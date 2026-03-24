import { transporter } from '../config/mailer.js'

export const sendEmail = async (email, report) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Habit Report',
    text: report
  })
}