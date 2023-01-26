import express from 'express'
import { addBook, deleteBook, getBook, getBooks, updateBook } from '../controllers/book.js'
import verifyToken from '../middlewares/verifyToken.js'
import verifyAdmin from "../middlewares/verifyAdmin.js"

const router = express.Router()

router.post('/', addBook)
router.put('/:id', verifyAdmin, updateBook)
router.delete('/:id', verifyAdmin, deleteBook)

router.get('/find/:id', verifyToken, getBook)
router.get('/', getBooks)

export default router;