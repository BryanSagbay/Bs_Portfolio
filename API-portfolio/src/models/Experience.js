import { pool } from '../databases/db.js'

export class Experience {
  constructor (id, company, active, position, period, schedule, projects, technologiesUsed) {
    this.id = id
    this.company = company
    this.active = active
    this.position = position
    this.period = period
    this.schedule = schedule
    this.projects = projects // JSONB
    this.technologies_used = technologiesUsed
  }

  static async findAll () {
    const result = await pool.query('SELECT * FROM experience ORDER BY id DESC')
    return result.rows.map(row => new Experience(
      row.id,
      row.company,
      row.active,
      row.position,
      row.period,
      row.schedule,
      row.projects,
      row.technologies_used
    ))
  }

  static async findById (id) {
    const result = await pool.query('SELECT * FROM experience WHERE id = $1', [id])
    if (result.rows.length === 0) return null
    const row = result.rows[0]
    return new Experience(
      row.id,
      row.company,
      row.active,
      row.position,
      row.period,
      row.schedule,
      row.projects,
      row.technologies_used
    )
  }

  static async create (data) {
    // Ensure projects is a JSON string if it's an object/array
    const projectsJson = typeof data.projects === 'string'
      ? data.projects
      : JSON.stringify(data.projects)

    const result = await pool.query(
      `INSERT INTO experience (
        company, active, position, period, schedule, projects, technologies_used
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        data.company,
        data.active,
        data.position,
        data.period,
        data.schedule,
        projectsJson,
        data.technologies_used
      ]
    )

    const row = result.rows[0]
    return new Experience(
      row.id,
      row.company,
      row.active,
      row.position,
      row.period,
      row.schedule,
      row.projects,
      row.technologies_used
    )
  }

  static async update (id, data) {
    // Ensure projects is a JSON string if it's an object/array
    const projectsJson = typeof data.projects === 'string'
      ? data.projects
      : JSON.stringify(data.projects)

    const result = await pool.query(
      `UPDATE experience SET
        company = $1,
        active = $2,
        position = $3,
        period = $4,
        schedule = $5,
        projects = $6,
        technologies_used = $7
      WHERE id = $8
      RETURNING *`,
      [
        data.company,
        data.active,
        data.position,
        data.period,
        data.schedule,
        projectsJson,
        data.technologies_used,
        id
      ]
    )

    if (result.rows.length === 0) return null

    const row = result.rows[0]
    return new Experience(
      row.id,
      row.company,
      row.active,
      row.position,
      row.period,
      row.schedule,
      row.projects,
      row.technologies_used
    )
  }

  static async delete (id) {
    const result = await pool.query('DELETE FROM experience WHERE id = $1 RETURNING *', [id])
    return result.rows.length > 0
  }
}
