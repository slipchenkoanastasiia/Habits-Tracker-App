import { transporter } from '../config/mailer.js'

export const sendEmail = async (email, reportHTML) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Habit Report',
    text: 'Your email client does not support HTML.', 
    html: reportHTML                                 
  })
}