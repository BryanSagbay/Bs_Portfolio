import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import authRoutes from './src/routes/authRoutes.js'
import researchRoutes from './src/routes/researchRoutes.js'
import homeRoutes from './src/routes/homeRoutes.js'
import projectsRoutes from './src/routes/projectsRoutes.js'
import experienceRoutes from './src/routes/experienceRoutes.js'
import aboutRoutes from './src/routes/aboutRoutes.js'
import { testConnection, initDatabase } from './src/databases/db.js'

dotenv.config()

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use('/uploads', express.static(join(__dirname, '../uploads')))
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/about', aboutRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/research', researchRoutes)
app.use('/api/home', homeRoutes)
app.use('/api/projects', projectsRoutes)
app.use('/api/experience', experienceRoutes)

app.get('/', (req, res) => {
  res.send('🚀 API de Portfolio - Bienvenido desde Vercel')
})

await testConnection()
await initDatabase()

export default app
