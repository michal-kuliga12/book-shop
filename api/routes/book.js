import express from "express";
import {
  addBook,
  addBookToBasket,
  addBookToFav,
  delBookFromBasket,
  delBookFromFav,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../controllers/book.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.post("/", addBook);
router.put("/:id", verifyAdmin, updateBook);
router.delete("/:id", verifyAdmin, deleteBook);

router.get("/find/:id", getBook);
router.get("/", getBooks);
//FAVORITE LIST
router.post("/fav/:id", verifyToken, addBookToFav);
router.delete("/fav/:id", verifyToken, delBookFromFav);
//BASKET
router.post("/basket/:id", verifyToken, addBookToBasket);
router.delete("/basket/:id", verifyToken, delBookFromBasket);

export default router;
