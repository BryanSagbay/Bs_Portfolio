import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'
import { fileURLToPath } from 'url'

import { PORT } from './config.js'
import authRoutes from './src/routes/authRoutes.js'
import researchRoutes from './src/routes/researchRoutes.js'
import homeRoutes from './src/routes/homeRoutes.js'
import projectsRoutes from './src/routes/projectsRoutes.js'
import experienceRoutes from './src/routes/experienceRoutes.js'
import aboutRoutes from './src/routes/aboutRoutes.js'
import { testConnection, initDatabase } from './src/databases/db.js'

// Cargar variables de entorno
dotenv.config()

const app = express()

// Seguridad y middlewares
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middleware para archivos estáticos (imágenes, GIFs, etc.)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Rutas de la API
app.use('/api/about', aboutRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/research', researchRoutes)
app.use('/api/home', homeRoutes)
app.use('/api/projects', projectsRoutes)
app.use('/api/experience', experienceRoutes)

// Ruta base
app.get('/', (req, res) => {
  res.send('🚀 API de Portfolio - Bienvenido')
})

// Arranque del servidor
const startServer = async () => {
  try {
    const connected = await testConnection()
    if (!connected) throw new Error('No se pudo conectar a la base de datos')

    await initDatabase()

    app.listen(PORT, () => {
      console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message)
    process.exit(1)
  }
}

startServer()
