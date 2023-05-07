import express from "express";
import {
  register,
  login,
  logout,
  refreshToken,
  checkToken,
} from "../controllers/auth.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);
router.get("/refreshToken", refreshToken);
router.get("/checkToken", verifyToken, checkToken);

export default router;
