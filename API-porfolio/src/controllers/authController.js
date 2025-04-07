import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { User } from '../models/User.js'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = '24h'

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: 'Se requiere nombre de usuario y contraseña' })
    }

    const user = await User.findByUsername(username)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    const token = generateToken(user)

    res.status(200).json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Error en login:', error)
    res.status(500).json({ message: 'Error del servidor', error: error.message })
  }
}

export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body

    if (!username || !password || !email) {
      return res.status(400).json({ message: 'Nombre de usuario, correo y contraseña son requeridos' })
    }

    const existingUser = await User.findByUsername(username)
    if (existingUser) {
      return res.status(409).json({ message: 'El nombre de usuario ya está en uso' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create(username, hashedPassword, email)

    const token = generateToken(newUser)

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    })
  } catch (error) {
    console.error('Error en registro:', error)
    res.status(500).json({ message: 'Error del servidor', error: error.message })
  }
}

export const logout = (_req, res) => {
  // JWT no requiere logout en backend
  res.status(200).json({ message: 'Logout exitoso' })
}
