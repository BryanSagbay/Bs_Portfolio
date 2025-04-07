export class User {
  constructor (id, username, password) {
    this.id = id
    this.username = username
    this.password = password
  }

  static async findByUsername (username) {
    // Simulación básica - en producción usarías una base de datos
    const users = [
      { id: 1, username: 'admin', password: 'admin123' },
      { id: 2, username: 'user', password: 'user123' }
    ]

    return users.find(user => user.username === username)
  }
}
