import express from 'express'
import { pool } from '../databases/db.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    // Consulta a la base de datos para verificar el usuario
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    )

    if (result.rows.length > 0) {
      return res.status(200).json({
        message: 'Inicio de sesión exitoso',
        token: process.env.JWT_SECRET
      })
    } else {
      return res.status(401).json({
        message: 'Credenciales inválidas'
      })
    }
  } catch (error) {
    console.error('Error al autenticar:', error)
    return res.status(500).json({
      message: 'Error interno del servidor'
    })
  }
})

export default router
