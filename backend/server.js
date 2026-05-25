import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import hotelDataAddedToDBRouter from "./routes/dataimport.router.js";
import categoryDataAddedToDBRouter from "./routes/categoryimport.router.js";

import hotelRouter from "./routes/hotel.router.js";
import categoryRouter from "./routes/category.router.js";
import singleHoterRouter from "./routes/singlehotel.router.js";
import authRouter from "./routes/auth.router.js";
import wishlistRouter from "./routes/wishlist.router.js";
import adminRouter from "./routes/admin.router.js";

import connectDB from "./config/dbconfig.js";

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

const PORT = 3500;

app.get("/", (req, res) => {
  res.send("Hello Geeks");
});

app.use("/api/hoteldata", hotelDataAddedToDBRouter);
app.use("/api/categorydata", categoryDataAddedToDBRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/category", categoryRouter);
app.use("/api/hotels", singleHoterRouter);
app.use("/api/auth", authRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/admin", adminRouter);

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
  app.listen(process.env.PORT || PORT, () => {
    console.log("Server is Up and Running");
  });
});
