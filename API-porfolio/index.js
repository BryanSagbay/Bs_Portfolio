import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'

import { PORT } from './config.js'
import authRoutes from './src/routes/authRoutes.js'
import researchRoutes from './src/routes/researchRoutes.js'
import { testConnection, initDatabase } from './src/databases/db.js'

dotenv.config()

const app = express()

// Seguridad y middlewares
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Ruta base
app.get('/', (req, res) => {
  res.send('🚀 API de Portfolio - Bienvenido')
})

// Rutas de autenticación
app.use('/api/auth', authRoutes)
app.use('/api/research', researchRoutes)

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
