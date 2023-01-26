import express from 'express'
import { register, login, logout, refreshToken } from '../controllers/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.delete('/logout', logout)
router.get('/refreshToken', refreshToken)


export default router;