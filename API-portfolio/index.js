import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import { PORT } from './config.js'
import authRoutes from './src/routes/authRoutes.js'
import researchRoutes from './src/routes/researchRoutes.js'
import homeRoutes from './src/routes/homeRoutes.js'
import projectsRoutes from './src/routes/projectsRoutes.js'
import experienceRoutes from './src/routes/experienceRoutes.js'
import aboutRoutes from './src/routes/aboutRoutes.js'
import { testConnection, initDatabase } from './src/databases/db.js'

dotenv.config()

const app = express()

// Obtener el directorio actual de la manera correcta en ES6
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Servir archivos estáticos desde 'uploads'
app.use('/uploads', express.static(join(__dirname, 'uploads')))

// Seguridad y middlewares
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rutas
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
