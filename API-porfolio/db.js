import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})

// Función para probar la conexión
const testConnection = async () => {
  try {
    const client = await pool.connect()
    console.log('Conexión a PostgreSQL establecida correctamente')
    client.release()
    return true
  } catch (error) {
    console.error('Error al conectar a PostgreSQL:', error)
    return false
  }
}

testConnection()
