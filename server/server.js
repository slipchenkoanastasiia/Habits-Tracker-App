import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import emailRoutes from './routes/emailRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5001

app.use(cors({
  origin: true,
  credentials: true
}))

app.use(express.json())

app.use((req, res, next) => {
  console.log('➡️', req.method, req.url)
  next()
})

app.use('/', emailRoutes)

app.get('/', (req, res) => {
  res.send('Backend is running 🚀')
})

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`)
})