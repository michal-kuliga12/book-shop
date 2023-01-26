import express from 'express'
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.js'

const router = express.Router()

router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

router.get('/find/:id', getUser)
router.get('/', getUsers)

export default router;