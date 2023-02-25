import Book from "../models/Book.js";
import User from "../models/User.js";
import createError from "../util/Error.js";
import mongoose from "mongoose";
import mongodb from "mongodb";

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
  if (req.query.title) {
    const searchQuery = req.query.title;
    req.query.title = searchQuery.replace(/%20/g, " ");
  }
  const regex = new RegExp(req.query.title, "i");
  try {
    const books = await Book.find({
      title: { $regex: regex },
      category: req.query.category,
      filter: req.query.filter,
    }).limit(req.query.limit || 40);
    res.status(200).json(books);
  } catch {
    next(err);
  }
};
//FAVORITE LIST
export const checkBookInFav = async (req, res, next) => {
  const bookId = req.params.id;
  try {
    let favBook = await User.find(
      { _id: req.userId },
      {
        favorites: { $elemMatch: { _id: mongoose.Types.ObjectId(bookId) } },
      }
    );
    favBook = favBook[0].favorites;
    if (favBook.length === 0) {
      return res.status(204).json({ favBook });
    }
    res.status(200).json({ favBook });
  } catch (err) {
    next(err);
  }
};
export const addBookToFav = async (req, res, next) => {
  const bookId = req.params.id;
  try {
    const book = await Book.findById(bookId);
    const user = await User.findByIdAndUpdate(req.userId, {
      $push: { favorites: book },
    });
    res.status(200).json(user.favorites);
  } catch (err) {
    next(err);
  }
};
export const delBookFromFav = async (req, res, next) => {
  const bookId = req.params.id;
  try {
    const foundBook = await Book.findById(bookId);
    const foundUser = await User.findById(req.userId);
    if (!foundBook || !foundUser)
      next(createError(404, "User or book not found"));
    foundUser.favorites.pull(foundBook);
    await foundUser.save();
    return res.status(200).json(foundUser.favorites);
  } catch (err) {
    next(err);
  }
};
//BASKET
export const getBasket = async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.userId);
    res.status(200).json(foundUser.basket);
  } catch (err) {
    next(err);
  }
};
export const addBookToBasket = async (req, res, next) => {
  //   const bookId = req.params.id;
  //   let orderedBook = {
  //     book: null,
  //     quantity: null,
  //     subtotal: null,
  //   };
  //   try {
  //     const foundBook = await Book.findById(bookId);
  //     const checkBook = await User.find(
  //       { _id: req.userId },
  //       { basket: { "book._id": mongoose.Types.ObjectId(bookId) } }
  //     );
  //     console.log(checkBook);
  //     console.log(checkBook.basket.length);
  //     if (checkBook.basket.length === 0) {
  //       console.log("if");
  //       orderedBook = {
  //         book: foundBook,
  //         quantity: 1,
  //         subtotal: foundBook.price,
  //       };
  //       const user = await User.findByIdAndUpdate(req.userId, {
  //         $push: { basket: orderedBook },
  //       });
  //     } else {
  //       console.log("else");
  //       orderedBook = {
  //         book: foundBook,
  //         quantity: checkBook.quantity + 1,
  //         subtotal: quantity * checkBook.price,
  //       };
  //       const searchTest = await User.findAndUpdate(
  //         { _id: req.userId, basket: { book: { _id: foundBook._id } } },
  //         {
  //           $set: {
  //             "quantity.$.std": orderedBook.quantity,
  //             "subtotal.$.std": orderedBook.subtotal,
  //           },
  //         }
  //       );
  //       console.log("test:" + searchTest);
  //     }
  //     console.log(orderedBook);
  //     // if (checkBook) {
  //     //   const orderedBooks = await User.findByIdAndUpdate(req.userId, {
  //     //      basket: {book._id: {}},
  //     //   });
  //     // } else {
  //     // }
  //     res.status(200).json(checkBook.basket);
  //   } catch (err) {
  //     console.log(err);
  //     next(err);
  //   }
};
export const delBookFromBasket = async (req, res, next) => {
  const bookId = req.params.id;
  try {
    const foundBook = await Book.findById(bookId);
    const foundUser = await User.findById(req.userId);
    if (!foundBook || !foundUser)
      next(createError(404, "User or book not found"));
    foundUser.basket.pull(foundBook);
    await foundUser.save();
    return res.status(200).json(foundUser.basket);
  } catch (err) {
    next(err);
  }
};
