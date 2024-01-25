require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const express = require("express");
const cors = require("cors");
const app = express();
const noteRouter = require("./router/note.router");
const connectDB = require("./config/database");
connectDB();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(function (req, res, next) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
});

app.use("/", noteRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server is Running"));
