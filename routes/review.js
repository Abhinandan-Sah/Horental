const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");


const validateReview = (req, res, next) =>{
    let {error} = reviewSchema.validate(req.body);
      if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
      }
      else{
        next();
      }
  }


//Reviews
// Post Route
router.post("/", validateReview, wrapAsync(async (req, res, next) => {
    console.log(req.params.id);
    // let listing = await Listing.findById(req.params.id);
    // let newReview = new Review(req.body.review);
    // listing.reviews.push(newReview);
  
    // await newReview.save();
    // await listing.save();
    
    // res.redirect(`/listings/${listing.id}`);

    try {
      const listing = await Listing.findById(req.params.id);
      if (!listing) {
        throw new ExpressError(404, "Listing not found");
      }
      const newReview = new Review(req.body.review);
      listing.reviews.push(newReview);
      await newReview.save();
      await listing.save();
      req.flash("success", "New Review Created!");
      res.redirect(`/listings/${listing._id}`);
    } catch (err) {
      next(err);
    }
  }));
  
  //Delete Review Route
  router.delete("/:reviewId", (async(req, res)=>{
    let {id, reviewId}=req.params;
  
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findById(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
  }));
  

  module.exports = router;