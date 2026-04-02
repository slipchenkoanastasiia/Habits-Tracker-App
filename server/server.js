import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import emailRoutes from './routes/emailRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5001

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5175']

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))

app.use(express.json())

app.use((req, res, next) => {
  console.log('➡️', req.method, req.url)
  next()
})

// 🔹 підключаємо роут
app.use('/', emailRoutes)

app.get('/', (req, res) => {
  res.send('Backend is running 🚀')
})

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`)
})