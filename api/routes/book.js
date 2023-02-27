import express from "express";
import {
  addBook,
  addBookToBasket,
  addBookToFav,
  addOrder,
  checkBookInFav,
  delBookFromBasket,
  delBookFromFav,
  deleteBook,
  getBasket,
  getBook,
  getBooks,
  updateBook,
} from "../controllers/book.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.post("/", addBook);
router.put("/:id", verifyAdmin, updateBook);
router.delete("/", verifyToken, deleteBook);

router.get("/find/:id", getBook);
router.get("/", getBooks);
router.get("/findFav/:id", verifyToken, checkBookInFav);
//FAVORITE LIST
router.post("/fav/:id", verifyToken, addBookToFav);
router.delete("/fav/:id", verifyToken, delBookFromFav);
//BASKET
router.get("/basket", verifyToken, getBasket);
router.post("/basket/:id", verifyToken, addBookToBasket);
router.delete("/basket/:id", verifyToken, delBookFromBasket);
//ORDER
router.post("/order/", verifyToken, addOrder);

export default router;
