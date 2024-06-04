const {listingSchema} = require("./schema.js");
const {reviewSchema} = require("./schema.js");


module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        req.flash("error", "you must be logged in to create listing!");
    return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next()
};

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let {error} = reviewSchema.validate(req.body);
      if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
      }
      else{
        next();
      }
};