import { pool } from '../databases/db.js'

export class About {
  constructor (id, name, title, location, phone, mail, photo, phrases, about, description) {
    this.id = id
    this.name = name
    this.title = title
    this.location = location
    this.phone = phone
    this.mail = mail
    this.photo = photo
    this.phrases = phrases
    this.about = about
    this.description = description
  }

  static async findAll () {
    const result = await pool.query('SELECT * FROM about ORDER BY id ASC')
    return result.rows.map(row => new About(
      row.id,
      row.name,
      row.title,
      row.location,
      row.phone,
      row.mail,
      row.photo,
      row.phrases,
      row.about,
      row.description
    ))
  }

  static async findById (id) {
    const result = await pool.query('SELECT * FROM about WHERE id = $1', [id])
    if (result.rows.length === 0) return null
    const row = result.rows[0]
    return new About(
      row.id,
      row.name,
      row.title,
      row.location,
      row.phone,
      row.mail,
      row.photo,
      row.phrases,
      row.about,
      row.description
    )
  }

  static async create (data) {
    const result = await pool.query(`
      INSERT INTO about (name, title, location, phone, mail, photo, phrases, about, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
    [
      data.name,
      data.title,
      data.location,
      data.phone,
      data.mail,
      data.photo,
      data.phrases,
      data.about,
      data.description
    ]
    )

    const row = result.rows[0]
    return new About(
      row.id,
      row.name,
      row.title,
      row.location,
      row.phone,
      row.mail,
      row.photo,
      row.phrases,
      row.about,
      row.description
    )
  }

  static async update (id, data) {
    const result = await pool.query(`
      UPDATE about SET
        name = $1,
        title = $2,
        location = $3,
        phone = $4,
        mail = $5,
        photo = $6,
        phrases = $7,
        about = $8,
        description = $9
      WHERE id = $10
      RETURNING *`,
    [
      data.name,
      data.title,
      data.location,
      data.phone,
      data.mail,
      data.photo,
      data.phrases,
      data.about,
      data.description,
      id
    ]
    )

    if (result.rows.length === 0) return null
    const row = result.rows[0]
    return new About(
      row.id,
      row.name,
      row.title,
      row.location,
      row.phone,
      row.mail,
      row.photo,
      row.phrases,
      row.about,
      row.description
    )
  }

  static async delete (id) {
    const result = await pool.query('DELETE FROM about WHERE id = $1 RETURNING *', [id])
    return result.rows.length > 0
  }
}
