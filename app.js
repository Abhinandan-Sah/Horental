if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}

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
const flash = require("connect-flash");
const passport = require("passport"); 
const LocalStrategy = require("passport-local");   
const User = require("./models/user.js");
const { isLoggedIn , validateReview, isReviewAuthor} = require("./middleware.js");
const Review = require("./models/review.js");                                                                                         

const Listing= require("./models/listing.js");
const wrapAsync = require("./utils/wrapAsync.js");


const listingRouter = require("./routes/listing.js");
// const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/horental";
// const dbUrl = process.env.ATLASDB_URL;


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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7*24*60*60*1000,
    maxAge: 7*24*60*60*1000,
    httpOnly:true,
  }

}

app.use(session(sessionOptions));
app.use(flash()); 
// Making Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
//Session Serialization and Deserialization of User
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Review Section
app.post("/listings/:id/reviews", isLoggedIn, wrapAsync(async(req, res)=>{
  const {id} = req.params.id;
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing._id}`);
}));


app.delete("/listings/:id/reviews/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(async(req, res)=>{
  let {id, reviewId} = req.params;

  await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("error", "Review has been Successfully deleted!");
  res.redirect(`/listings/${id}`);
}));
// Ending of Review Section

app.use("/listings", listingRouter);
// app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);






// Home page
app.get("/", (req, res) => {
  res.render("listings/home.ejs");
});
// Home page
app.get("/home", (req, res) => {
  res.render("listings/home.ejs");
});
// Book listing page
app.get("/book", isLoggedIn, (req, res) => {
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
