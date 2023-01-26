import Book from "../models/Book.js"

// ADD BOOK
export const addBook = async (req,res,next) => {
    try {
        const newBook = new Book(req.body)
        await newBook.save()
        res.status(200).json(newBook)
    } catch (err) {
        next(err)
    }
}
// UPDATE BOOK
export const updateBook = async (req,res,next) => {
    const id = req.params.id
    try {
        const updatedBook = await Book.findByIdAndUpdate({_id: id},{ $set: req.body},{new: true})
        res.status(200).json(updatedBook)
    } catch(err) {
        next(err)
    }
}
// DELETE BOOK
export const deleteBook = async (req,res,next) => {
    const id = req.params.id
    try {
        const deletedBook = await Book.findByIdAndDelete(id)
        res.status(200).json(deletedBook)
    } catch (err) {
        next(err)
    }
}
// GET BOOK
export const getBook = async (req,res,next) => {
    const id = req.params.id
    try {
        const book = await Book.findOne({_id:id})
        res.status(200).json(book)
    } catch {
        next(err)
    }
}
//GET ALL BOOKS
export const getBooks = async (req,res,next) => {
    try {
        const books = await Book.find()
        res.status(200).json(books)
    } catch {
        next(err)
    }
}


