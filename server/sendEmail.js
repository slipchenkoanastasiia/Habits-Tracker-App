import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}))

app.options('*', cors())

app.use(express.json())

app.use((req, res, next) => {
  console.log('➡️', req.method, req.url)
  next()
})

app.get('/', (req, res) => {
  res.send('Backend is running 🚀')
})

app.post('/send-report', (req, res) => {
  const { email, report } = req.body

  console.log('📩 BODY:', req.body)

  if (!email || !report) {
    return res.status(400).json({ error: 'Email and report text required' })
  }

  res.json({ message: 'OK' })
})

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`)
})