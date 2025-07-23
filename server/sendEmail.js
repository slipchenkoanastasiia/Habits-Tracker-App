import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your.email@gmail.com',    
    pass: 'your_app_password', 
  },
})

async function sendReportEmail(toEmail, reportText) {
  const mailOptions = {
    from: 'your.email@gmail.com',
    to: toEmail,
    subject: 'Weekly Habit Report',
    text: reportText,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent:', info.response)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

sendReportEmail('recipient@example.com', 'Here is your report... 📝')
