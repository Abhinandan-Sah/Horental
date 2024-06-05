const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js")


// const validateListing = (req, res, next) => {
  
// };

//Index Route
router.get("/", wrapAsync(listingController.index));

//New Route
router.get("/new", isLoggedIn, (req, res) => {
  
  res.render("listings/new.ejs");
});

//Show Route
router.get(
    "/:id",
    wrapAsync(async (req, res, next) => {
      const { id } = req.params;
      const listing = await Listing.findById(id).populate({path:"reviews", populate:{path:"author"}}).populate("owner");
      if(!listing){
        req.flash("error", "Listing Page for your request doesn't exist!");
        res.redirect("/listings");
      }
      // console.log(listing);
      res.render("listings/show.ejs", { listing });
    })
  );

//Create Route and error handling done on it with wrapAsync
router.post(
  "/",
  isLoggedIn,
  wrapAsync(async (req, res, next) => {
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  })
);

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn, isOwner,
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error", "Listing Page for your request doesn't exist!");
      res.redirect("/listings");
    }
    
    res.render("listings/edit.ejs", { listing });
  })
);

//Update Route
router.put(
  "/:id",
  isLoggedIn, isOwner,
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  })
);

//Delete Route
router.delete(
  "/:id", isLoggedIn, isOwner,
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  })
);





router.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

//middleware for error handling
router.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

module.exports = router;