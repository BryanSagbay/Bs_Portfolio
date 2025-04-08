import { pool } from '../databases/db.js'

export class Research {
  constructor (id, title, description, date, timeread, article, comingsoon) {
    this.id = id
    this.title = title
    this.description = description
    this.date = date
    this.timeread = timeread
    this.article = article
    this.comingsoon = comingsoon
  }

  static async findAll () {
    const result = await pool.query('SELECT * FROM research ORDER BY id DESC')
    return result.rows.map(r => new Research(
      r.id,
      r.title,
      r.description,
      r.date,
      r.timeread,
      r.article,
      r.comingsoon
    ))
  }

  static async findById (id) {
    const result = await pool.query('SELECT * FROM research WHERE id = $1', [id])
    if (result.rows.length === 0) return null

    const r = result.rows[0]
    return new Research(r.id, r.title, r.description, r.date, r.timeread, r.article, r.comingsoon)
  }

  static async create ({ title, description, date, timeread, article, comingsoon }) {
    const result = await pool.query(
      `INSERT INTO research (title, description, date, timeread, article, comingsoon)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, description, date, timeread, article, comingsoon]
    )
    const r = result.rows[0]
    return new Research(r.id, r.title, r.description, r.date, r.timeread, r.article, r.comingsoon)
  }

  static async update (id, data) {
    const result = await pool.query(
      `UPDATE research
       SET title = $1, description = $2, date = $3, timeread = $4, article = $5, comingsoon = $6
       WHERE id = $7 RETURNING *`,
      [data.title, data.description, data.date, data.timeread, data.article, data.comingsoon, id]
    )
    if (result.rows.length === 0) return null
    const r = result.rows[0]
    return new Research(r.id, r.title, r.description, r.date, r.timeread, r.article, r.comingsoon)
  }

  static async delete (id) {
    const result = await pool.query('DELETE FROM research WHERE id = $1 RETURNING *', [id])
    if (result.rows.length === 0) return null
    return true
  }
}
