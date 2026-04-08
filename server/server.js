import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import emailRoutes from './routes/emailRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()
const port = process.env.PORT || 5001

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors({
  origin: true,
  credentials: true
}))

app.use(express.json())

app.use((req, res, next) => {
  console.log('➡️', req.method, req.url)
  next()
})

app.use('/api', emailRoutes) 

app.use(express.static(path.join(__dirname, '../dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`)
})