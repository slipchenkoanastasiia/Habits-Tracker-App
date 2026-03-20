import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const app = express()
const port = process.env.PORT || 5001

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())

app.use((req, res, next) => {
  console.log('➡️', req.method, req.url)
  next()
})

app.get('/', (req, res) => {
  res.send(`
    <h1>Backend is running 🚀</h1>
    <p>Server works!</p>
  `)
})

app.post('/send-report', async (req, res) => {
  const { email, report } = req.body

  console.log('📩 BODY:', req.body)

  if (!email || !report) {
    return res.status(400).json({
      error: 'Email and report text required'
    })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Habit Report',
      text: report
    })

    return res.json({
      message: 'Email sent successfully ✅'
    })

  } catch (error) {
    console.error('❌ Email error:', error)

    return res.status(500).json({
      error: 'Failed to send email'
    })
  }
})

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`)
})