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

// Inicialización de la tabla de usuarios si no existe
const initDatabase = async () => {
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('Base de datos inicializada correctamente')

    // Verificar si ya existe un usuario admin
    const checkAdmin = await client.query(`
      SELECT id FROM users WHERE username = 'bryan'
      `
    )

    // Si no existe, crear un usuario admin por defecto
    if (checkAdmin.rows.length === 0) {
      console.log('Usuario admin creado correctamente')
    }
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error)
  } finally {
    client.release()
  }
}

export { pool, testConnection, initDatabase }
