const express= require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn, isLoggedInsidelist, isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/reviewController.js");

// New review
router.post("/",isLoggedIn, validateReview,wrapAsync(reviewController.newReview));

// Delete review route
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports= router