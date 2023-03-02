import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.put("/:id", verifyToken, verifyAdmin, updateUser);
router.delete("/", verifyToken, verifyAdmin, deleteUser);

router.get("/find", verifyToken, verifyAdmin, getUser);
router.get("/", verifyToken, verifyAdmin, getUsers);

export default router;
