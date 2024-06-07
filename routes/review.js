const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const router = express.Router({mergeParams: true});
const reviewController = require("../controllers/reviews.js");

//Reviews
//Post Review Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.postReview));

//Delete Review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;