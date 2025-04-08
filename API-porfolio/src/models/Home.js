import { pool } from '../db.js'

export class Home {
  constructor (data) {
    Object.assign(this, data)
  }

  static async getAll () {
    const result = await pool.query('SELECT * FROM home')
    return result.rows.map(row => new Home(row))
  }

  static async getById (id) {
    const result = await pool.query('SELECT * FROM home WHERE id = $1', [id])
    if (result.rows.length === 0) return null
    return new Home(result.rows[0])
  }

  static async create (data) {
    const {
      name, title, description, yearexperience,
      completedprojects, satisfiedclients,
      github, linkedin, instagram, x, cv, correo
    } = data

    const result = await pool.query(
      `INSERT INTO home (
        name, title, description, year_experience, completed_projects,
        satisfied_clients, github, linkedin, instagram, x, cv, correo
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [name, title, description, yearexperience, completedprojects,
        satisfiedclients, github, linkedin, instagram, x, cv, correo]
    )

    return new Home(result.rows[0])
  }

  static async update (id, data) {
    const {
      name, title, description, yearexperience,
      completedprojects, satisfiedclients,
      github, linkedin, instagram, x, cv, correo
    } = data

    const result = await pool.query(
      `UPDATE home SET
        name = $1, title = $2, description = $3,
        year_experience = $4, completed_projects = $5, satisfied_clients = $6,
        github = $7, linkedin = $8, instagram = $9, x = $10, cv = $11, correo = $12
       WHERE id = $13 RETURNING *`,
      [name, title, description, yearexperience, completedprojects,
        satisfiedclients, github, linkedin, instagram, x, cv, correo, id]
    )

    if (result.rows.length === 0) return null
    return new Home(result.rows[0])
  }

  static async delete (id) {
    const result = await pool.query('DELETE FROM home WHERE id = $1 RETURNING *', [id])
    if (result.rows.length === 0) return null
    return new Home(result.rows[0])
  }
}
