import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.get("/find", verifyToken, getUser);
router.get("/", getUsers);

export default router;
