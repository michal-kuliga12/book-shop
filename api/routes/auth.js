import express from "express";
import {
  register,
  login,
  logout,
  refreshToken,
  checkToken,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);
router.get("/refreshToken", refreshToken);
router.get("/checkToken", checkToken);

export default router;
