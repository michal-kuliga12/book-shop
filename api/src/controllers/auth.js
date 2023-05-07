import User from "../models/User.js";
import bcrypt from "bcrypt";
import createError from "../util/Error.js";
import jwt from "jsonwebtoken";
import generateToken from "../util/GenerateToken.js";
import Token from "../models/Token.js";

export const register = async (req, res, next) => {
  const { username, password, email } = req.body;
  const saltRounds = 10;
  try {
    const foundUser = await User.findOne({ username: username, email: email });
    if (foundUser) return res.status(409).send("user already exists");
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      const newUser = new User({ username, password: hash, email });
      const user = await newUser.save();
      res.status(200).json(user);
    });
  } catch (err) {
    return next(err);
  }
};
export const login = async (req, res, next) => {
  const user = req.body;
  try {
    const dbUser = await User.findOne({ username: user.username });
    if (!dbUser) {
      return next(createError(404, "User not found"));
    }
    const isPasswordValid = await bcrypt.compare(
      user.password,
      dbUser.password
    );
    if (!isPasswordValid) {
      return next(createError(401, "Incorrect password"));
    }
    if (dbUser.email !== user.email) {
      return next(createError(401, "Incorrect login data"));
    }
    //create token
    const access_token = generateToken(dbUser);
    const refresh_token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.REFRESH_TOKEN
    );
    const refresh_token_db = new Token({ token: refresh_token });
    refresh_token_db.save((err, token) => {
      if (err) return next(createError(500, "cant add token to db"));
    });
    res
      .cookie("access_token", access_token, {
        maxAge: 600000,
        httpOnly: true,
        // secure: process.env.ACCESS_TOKEN === "production",
        secure: true,
        sameSite: "none",
        // domain: [
        //   "onrender.com",
        //   "render.com",
        //   "localhost:3000",
        //   "vercel.com",
        //   "localhost",
        // ],
      })
      .cookie("refresh_token", refresh_token, {
        httpOnly: true,
        // secure: process.env.REFRESH_TOKEN === "production",
        secure: true,
        sameSite: "none",
        // domain: [
        //   "onrender.com",
        //   "render.com",
        //   "localhost:3000",
        //   "vercel.com",
        //   "localhost",
        // ],
      })
      .status(200)
      .json({
        access_token: access_token,
        refresh_token: refresh_token,
      });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req, res, next) => {
  const token = req.cookies.refresh_token;
  const db_token = await Token.findOne({ token: token });
  const user = { _id: req.userId, isAdmin: req.userIsAdmin };

  if (!token) {
    return next(createError(401, "Unauthorized"));
  }
  if (!db_token) {
    return next(createError(401, "Unauthorized"));
  }
  const access_token = generateToken(user);
  return access_token;
  // res
  //   .cookie("access_token", access_token, {
  //     maxAge: 600000,
  //     httpOnly: true,
  //     // secure: process.env.ACCESS_TOKEN === "production",
  //     secure: true,
  //     sameSite: "none",
  //   })
  //   .status(200)
  //   .json({ access_token: access_token })
  //   .end();
};

export const checkToken = async (req, res, next) => {
  const token = await refreshToken(req, res, next);
  let basketItems = 0;
  if (!token) {
    return res.status(401).json({ user: null });
  }
  try {
    const data = jwt.verify(token, process.env.ACCESS_TOKEN);
    const user = await User.findById(data.id);
    user.basket.map((item) => {
      basketItems += item.quantity;
    });
    res
      .status(200)
      .cookie("access_token", token, {
        maxAge: 600000,
        httpOnly: true,
        // secure: process.env.ACCESS_TOKEN === "production",
        secure: true,
        sameSite: "none",
      })
      .json({
        user: user.username,
        isAdmin: user.isAdmin,
        basketItems: basketItems,
      });
  } catch (err) {
    return res.status(401).json({ user: null });
    console.log(err);
  }
};

export const logout = async (req, res, next) => {
  const db_token = await Token.deleteOne({ token: req.cookies.refresh_token });
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .clearCookie("refresh_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json({ db_token })
    .end();
};
