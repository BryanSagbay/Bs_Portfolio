import { pool } from '../databases/db.js'
import bcrypt from 'bcrypt'

export class User {
  constructor (id, username, password, email) {
    this.id = id
    this.username = username
    this.password = password
    this.email = email
  }

  toJSON () {
    const { password, ...safeData } = this
    return safeData
  }

  static async findByUsername (username) {
    if (!username) throw new Error('Username es requerido')

    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      )

      if (result.rows.length === 0) return null

      const user = result.rows[0]
      return new User(user.id, user.username, user.password, user.email)
    } catch (error) {
      console.error('Error al buscar usuario:', error)
      throw new Error('No se pudo buscar el usuario')
    }
  }

  static async create (username, password, email) {
    if (!username || !password || !email) {
      throw new Error('Todos los campos (username, password, email) son obligatorios')
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10) // 10 salt rounds

      const result = await pool.query(
        'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
        [username, hashedPassword, email]
      )

      const user = result.rows[0]
      return new User(user.id, user.username, user.password, user.email)
    } catch (error) {
      // PostgreSQL error code for unique_violation
      if (error.code === '23505') {
        throw new Error('El usuario o email ya está registrado')
      }

      console.error('Error al crear usuario:', error)
      throw new Error('No se pudo crear el usuario')
    }
  }

  // Método auxiliar para verificar contraseña
  async checkPassword (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password)
  }
}
