import { pool } from '../databases/db.js'

export class Home {
  constructor (id, name, title, description, yearexperience, completedprojects, satisfiedclients, github, linkedin, instagram, x, cv, correo) {
    this.id = id
    this.name = name
    this.title = title
    this.description = description
    this.year_experience = yearexperience
    this.completed_projects = completedprojects
    this.satisfied_clients = satisfiedclients
    this.github = github
    this.linkedin = linkedin
    this.instagram = instagram
    this.x = x
    this.cv = cv
    this.correo = correo
  }

  static async findAll () {
    const result = await pool.query('SELECT * FROM home ORDER BY id ASC')
    return result.rows.map(row => new Home(
      row.id,
      row.name,
      row.title,
      row.description,
      row.year_experience,
      row.completed_projects,
      row.satisfied_clients,
      row.github,
      row.linkedin,
      row.instagram,
      row.x,
      row.cv,
      row.correo
    ))
  }

  static async findById (id) {
    const result = await pool.query('SELECT * FROM home WHERE id = $1', [id])
    if (result.rows.length === 0) return null

    const row = result.rows[0]
    return new Home(
      row.id,
      row.name,
      row.title,
      row.description,
      row.year_experience,
      row.completed_projects,
      row.satisfied_clients,
      row.github,
      row.linkedin,
      row.instagram,
      row.x,
      row.cv,
      row.correo
    )
  }

  static async create (data) {
    const result = await pool.query(`
      INSERT INTO home (name, title, description, year_experience, completed_projects, satisfied_clients, github, linkedin, instagram, x, cv, correo)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `, [
      data.name, data.title, data.description, data.year_experience,
      data.completed_projects, data.satisfied_clients,
      data.github, data.linkedin, data.instagram, data.x, data.cv, data.correo
    ])

    return new Home(...Object.values(result.rows[0]))
  }

  static async update (id, data) {
    const result = await pool.query(`
      UPDATE home SET
        name = $1,
        title = $2,
        description = $3,
        year_experience = $4,
        completed_projects = $5,
        satisfied_clients = $6,
        github = $7,
        linkedin = $8,
        instagram = $9,
        x = $10,
        cv = $11,
        correo = $12
      WHERE id = $13
      RETURNING *
    `, [
      data.name, data.title, data.description, data.year_experience,
      data.completed_projects, data.satisfied_clients,
      data.github, data.linkedin, data.instagram, data.x, data.cv, data.correo,
      id
    ])

    if (result.rows.length === 0) return null
    return new Home(...Object.values(result.rows[0]))
  }

  static async delete (id) {
    const result = await pool.query('DELETE FROM home WHERE id = $1 RETURNING *', [id])
    return result.rows.length > 0
  }
}
