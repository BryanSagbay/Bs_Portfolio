import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  )
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: 'Nombre de usuario y contraseña son requeridos' })
    }

    const user = await User.findByUsername(username)
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

    const isMatch = await user.checkPassword(password)
    if (!isMatch) return res.status(401).json({ message: 'Credenciales inválidas' })

    const token = generateToken(user)

    res.status(200).json({
      message: 'Login exitoso',
      token,
      user: { id: user.id, username: user.username, email: user.email }
    })
  } catch (error) {
    console.error('Error en login:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body

    if (!username || !password || !email) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' })
    }

    const existingUser = await User.findByUsername(username)
    if (existingUser) {
      return res.status(409).json({ message: 'El nombre de usuario ya está en uso' })
    }

    const newUser = await User.create(username, password, email)
    const token = generateToken(newUser)

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: { id: newUser.id, username: newUser.username, email: newUser.email }
    })
  } catch (error) {
    console.error('Error en registro:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const logout = (_req, res) => {
  res.status(200).json({ message: 'Logout exitoso' })
}
