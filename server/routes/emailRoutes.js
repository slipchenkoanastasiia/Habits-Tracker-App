import express from 'express'
import { sendEmail } from '../services/emailService.js'

const router = express.Router()

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

router.post('/send-report', async (req, res) => {
  const { email, report } = req.body

  console.log('📩 BODY:', req.body)

  if (!email || !report) {
    return res.status(400).json({
      success: false,
      error: 'Email and report required'
    })
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email'
    })
  }

  try {
    await sendEmail(email, report)

    res.json({
      success: true,
      message: 'Email sent successfully ✅'
    })
  } catch (error) {
    console.error('❌ Email error:', error)

    res.status(500).json({
      success: false,
      error: 'Failed to send email'
    })
  }
})

export default router