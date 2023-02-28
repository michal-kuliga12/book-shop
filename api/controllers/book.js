import Book from "../models/Book.js";
import User from "../models/User.js";
import createError from "../util/Error.js";
import mongoose from "mongoose";

// ADD BOOK
export const addBook = async (req, res, next) => {
  console.log(req.body.data);
  try {
    const newBook = new Book(req.body.data);
    await newBook.save();
    res.status(200).json(newBook);
  } catch (err) {
    next(err);
    console.log(err);
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
  const idArray = req.body;
  try {
    const deletedBook = await Book.deleteMany({ _id: { $in: idArray } });
    res.status(200).json({ deletedBook });
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
  req.query.title = { $regex: regex };
  try {
    const books = await Book.find(req.query).limit(req.query.limit || 40);
    // console.log(books);
    res.status(200).json(books);
  } catch (err) {
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
  let totalPrice = 0;
  try {
    const foundUser = await User.findById(req.userId);
    foundUser.basket.map((item) => {
      totalPrice += item.subTotal;
    });
    res.status(200).json([foundUser.basket, totalPrice]);
  } catch (err) {
    next(err);
  }
};
export const addBookToBasket = async (req, res, next) => {
  const bookId = req.params.id;
  let orderedBook = {
    book: null,
    quantity: null,
    price: null,
    subTotal: null,
  };
  try {
    const foundBook = await Book.findById(bookId);
    const checkBook = await User.findOne(
      {
        _id: req.userId,
      }
      // { "basket.book": { $in: { _id: mongoose.Types.ObjectId(bookId) } } }
    );
    const filterResults = checkBook.basket.filter((item) => {
      let a = String(item.book._id);
      let b = String(mongoose.Types.ObjectId(bookId));
      return a === b;
    });
    // console.log(bookId);
    // console.log(filterResults);
    // console.log(filterResults[0].book);
    // console.log(checkBook);
    if (filterResults.length > 0) {
      orderedBook = {
        book: foundBook,
        quantity: filterResults[0].quantity + 1,
        price: foundBook.price,
        subTotal: (filterResults[0].quantity + 1) * foundBook.price,
      };
      await User.findOneAndUpdate(
        { _id: req.userId },
        {
          $set: {
            "basket.$[elem].quantity": orderedBook.quantity,
            "basket.$[elem].subTotal": orderedBook.subTotal,
          },
        },
        {
          arrayFilters: [{ "elem.book._id": mongoose.Types.ObjectId(bookId) }],
        }
      );
    } else {
      orderedBook = {
        book: foundBook,
        quantity: 1,
        price: foundBook.price,
        subTotal: foundBook.price,
      };
      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        { $push: { basket: orderedBook } }
      );
    }

    // if (checkBook) {
    //   const orderedBooks = await User.findByIdAndUpdate(req.userId, {
    //      basket: {book._id: {}},
    //   });
    // } else {
    // }
    res.status(200).json(checkBook);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const delBookFromBasket = async (req, res, next) => {
  const basketItemId = req.params.id;
  console.log(basketItemId);
  try {
    // const foundBook = await Book.findById(basketItemId);
    const foundUser = await User.findById(req.userId);
    let filteredBasket = foundUser.basket.filter((item) => {
      const id1 = String(item._id);
      const id2 = String(basketItemId);
      return id1 === id2;
    });
    console.log(filteredBasket);
    if (filteredBasket[0].quantity === 1) {
      const item = foundUser.basket.pull({ _id: basketItemId });
      foundUser.basket = item;
      await foundUser.save();
    } else {
      //DZIAŁA
      filteredBasket[0].quantity -= 1;
      foundUser.basket.pull({ _id: basketItemId });
      foundUser.basket.push(filteredBasket[0]);
      await foundUser.save();
    }

    // if (filteredBasket.length === 0)
    //   next(createError(404, "User or book not found"));
    // if (filteredBasket[0].quantity === 1) {
    //   console.log("pulling");
    //   const pulled = await User.findByIdAndUpdate(
    //     req.userId,
    //     {
    //       $pull: {
    //         basket: { _id: bookId },
    //       },
    //     },
    //     { new: true }
    //   );
    //   console.log(pulled);
    // } else {
    //   const pulled = await User.findByIdAndUpdate(
    //     req.userId,
    //       $set: {
    //         basket: { : bookId - 1 },
    //       },
    //       arrayFilters:
    //   );
    //   console.log(pulled);
    // }
    return res.status(200).json(foundUser.basket);
  } catch (err) {
    next(err);
    console.log(err);
  }
};
//ORDER
export const addOrder = async (req, res, next) => {
  const payload = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.userId },
      { $push: { orders: payload }, $set: { basket: [] } }
    );
    res.status(200).json(user.orders);
  } catch (err) {
    next(err);
  }
};
