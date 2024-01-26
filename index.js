require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const noteRouter = require("./router/note.router");
const connectDB = require("./config/database");
connectDB();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Parse incoming JSON requests
app.use(express.json());

// Parse incoming URL-encoded data
app.use(express.urlencoded({ extended: false }));

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

// Mount the note router at the root URL ("/")
app.use("/", noteRouter);

// Configure the view engine (EJS) and set views directory
app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");

// Define the port for the server, defaulting to 5000
const port = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(port, () => console.log("Server is Running"));
