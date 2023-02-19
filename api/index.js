import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoute from "./routes/book.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import verifyToken from "./middlewares/verifyToken.js";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "book-shop-ruddy.vercel.app",
      "https://book-shop-mishiio.vercel.app",
    ],
    credentials: true,
    methods: "*",
  })
);
app.use(cookieParser());
app.use(express.json());
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
