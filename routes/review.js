const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const { validateReview, isLoggedIn } = require("../middleware");
const Listing = require("../models/listing.js");
const Review= require("../models/review.js");
const router = express.Router({mergeParams: true});

//Reviews
//Post Review Route
router.post("/:id/reviews", validateReview, isLoggedIn, wrapAsync(async(req, res)=>{
  console.log(req.params.id);
  let {id} = require(req.params.id);
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  res.redirect(`/listings`);
}));

router.delete("/:reviewId", isLoggedIn, wrapAsync(async(req, res)=>{
  let {id, reviewId} = req.params;

  await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);

  res.redirect(`/listings/${id}`);
}));

module.exports = router;