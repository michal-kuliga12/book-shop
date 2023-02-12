import Book from "../models/Book.js";
import User from "../models/User.js";

// ADD BOOK
export const addBook = async (req, res, next) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(200).json(newBook);
  } catch (err) {
    next(err);
  }
};
// UPDATE BOOK
export const updateBook = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (err) {
    next(err);
  }
};
// DELETE BOOK
export const deleteBook = async (req, res, next) => {
  const id = req.params.id;
  console.log(req.userId);
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    res.status(200).json(deletedBook);
  } catch (err) {
    next(err);
  }
};
// GET BOOK
export const getBook = async (req, res, next) => {
  const id = req.params.id;
  try {
    const book = await Book.findOne({ _id: id });
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};
//GET ALL BOOKS
export const getBooks = async (req, res, next) => {
  console.log(req.query);
  try {
    const books = await Book.find(req.query).limit(req.query.limit || 40);
    res.status(200).json(books);
  } catch {
    next(err);
  }
};
//FAVORITE LIST
export const addBookToFav = async (req, res, next) => {
  const bookId = req.params.id;
  console.log(bookId);
  console.log(req.userId);
  try {
    const book = await Book.findById(bookId);
    console.log(book);
    const user = await User.findByIdAndUpdate(req.userId, {
      $push: { favorites: book },
    });
    console.log(user);
    res.status(200).json(user.favorites);
  } catch (err) {
    next(err);
  }
};
export const delBookFromFav = async (req, res, next) => {
  const bookId = req.params.id;
  console.log(bookId);
  try {
    const result = await User.findOneAndUpdate(
      { _id: req.userId },
      {
        $pull: {
          favorites: { _id: "63cc38d7f1dbce27e657dfc0 " },
        },
      },
      { safe: true, multi: false }
    );
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
