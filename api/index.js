import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoute from "./routes/book.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import verifyToken from "./middlewares/verifyToken.js";
import session from "express-session";
import generateToken from "./util/GenerateToken.js";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://book-shop-ruddy.vercel.app",
      "https://book-shop-git-master-mishiio.vercel.app",
      "https://book-shop-mishiio.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
const sessionConfig = {
  secret: "51948448eff3fcf07f2e8",
  cookie: {
    sameSite: "none",
    secure: true,
  },
};
// if (app.get(`${process.env.NODE_ENV}`) === "production") {
//   app.set("trust proxy", 1); // trust first proxy
//   sess.cookie.secure = true; // serve secure cookies
// }
app.use(cookieParser());
app.use(session(sessionConfig));
app.use(express.json());
app.use(express.static("public"));
dotenv.config();

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
  } catch (error) {
    console.log(error);
  }
};
mongoose.connection.on("connected", () => {
  console.log("connected to Mongo");
});
mongoose.connection.on("disconnected", () => {
  console.log("disconnected from Mongo");
});

//routes

app.use("/book", bookRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "error";
  res.status(errStatus).json({
    success: false,
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
});

app.listen(5000, () => {
  connectMongo();
  console.log("app is listening on port 5000...");
});
