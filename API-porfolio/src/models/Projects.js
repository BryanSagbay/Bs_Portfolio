import { pool } from '../databases/db.js'

export class Projects {
  constructor (id, type, title, description, imagen, indice, link) {
    this.id = id
    this.type = type
    this.title = title
    this.description = description
    this.imagen = imagen
    this.indice = indice
    this.link = link
  }

  static async findAll () {
    const result = await pool.query('SELECT * FROM projects ORDER BY indice ASC')
    return result.rows.map(row => new Projects(
      row.id,
      row.type,
      row.title,
      row.description,
      row.imagen,
      row.indice,
      row.link
    ))
  }

  static async findById (id) {
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id])
    if (result.rows.length === 0) return null

    const row = result.rows[0]
    return new Projects(
      row.id,
      row.type,
      row.title,
      row.description,
      row.imagen,
      row.indice,
      row.link
    )
  }

  static async create (data) {
    const result = await pool.query(`
      INSERT INTO projects (type, title, description, imagen, indice, link)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
    [data.type, data.title, data.description, data.imagen, data.indice, data.link]
    )

    const row = result.rows[0]
    return new Projects(
      row.id,
      row.type,
      row.title,
      row.description,
      row.imagen,
      row.indice,
      row.link
    )
  }

  static async update (id, data) {
    const result = await pool.query(`
      UPDATE projects
      SET type = $1, title = $2, description = $3, imagen = $4, indice = $5, link = $6
      WHERE id = $7
      RETURNING *`,
    [data.type, data.title, data.description, data.imagen, data.indice, data.link, id]
    )

    if (result.rows.length === 0) return null

    const row = result.rows[0]
    return new Projects(
      row.id,
      row.type,
      row.title,
      row.description,
      row.imagen,
      row.indice,
      row.link
    )
  }

  static async delete (id) {
    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id])
    return result.rows.length > 0
  }
}
