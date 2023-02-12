import express from "express";
import {
  addBook,
  addBookToFav,
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

router.post("/fav/:id", verifyToken, addBookToFav);
router.delete("/fav/:id", verifyToken, delBookFromFav);

// router.post("/basket/:id", addBookToBasket);
// router.delete("/basket/:id", delBookFromBasket);
export default router;
