const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const { log } = require("console");
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
// const dbUrl = process.env.ATLASDB_URL;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true
}

app.use(session(sessionOptions));

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

  async function main() {
    await mongoose.connect(MONGO_URL);
  }

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

// Home page
app.get("/", (req, res) => {
  res.render("listings/home.ejs");
});
// Home page
app.get("/home", (req, res) => {
  res.render("listings/home.ejs");
});
// Book listing page
app.get("/book", (req, res) => {
  res.render("listings/book.ejs");
});

// Login Page
app.get("/login", (req, res) => {
  res.render("listings/login.ejs");
});



app.all("*", (req, res, next)=> {
  next(new ExpressError(404, "Page Not Found!"));
});

//middleware for error handling
app.use((err, req, res, next) => {
  let {statusCode=500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", {message});

})

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
