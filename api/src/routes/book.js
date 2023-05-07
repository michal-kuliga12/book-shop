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
  imgToWebp,
  updateBook,
} from "../controllers/book.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.post("/", verifyToken, verifyAdmin, addBook);
router.put("/:id", verifyToken, verifyAdmin, updateBook);
router.delete("/", verifyToken, verifyAdmin, deleteBook);

router.get("/find/:id", getBook);
router.get("/imgToWebp", imgToWebp);
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
