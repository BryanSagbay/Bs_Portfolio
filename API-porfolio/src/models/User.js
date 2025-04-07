import { pool } from '../db.js'

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
      const result = await pool.query(
        'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
        [username, password, email]
      )

      const user = result.rows[0]
      return new User(user.id, user.username, user.password, user.email)
    } catch (error) {
      console.error('Error al crear usuario:', error)
      throw new Error('No se pudo crear el usuario')
    }
  }
}
